import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../services/notification.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {CityBackendApi, CityService} from '../services/city.service';
import {City} from '../models/city';
import {Zone} from '../models/zone';
import {ZoneService} from '../services/zone.service';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements AfterViewInit {

// @ts-ignore
  srchObj: City = {zone: {}};
  data = new MatTableDataSource<CityBackendApi>();
  displayedColumns: string[] = ['id', 'name', 'code', 'zone', 'updatedTime', 'createdTime', 'action'];

  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);
  filter: City = new City();
  zones: Zone[] = [];

  constructor(public dialog: MatDialog,
              private service: CityService,
              private zoneService: ZoneService,
              private utilService: UtilService,
              private notifyService: NotificationService) {
  }

  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.resultsLength = 0;
    this.getMainData();
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.zoneService.getList(10000, 0, '');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.zones = data;
      console.log(data);
    });
  }

  clearFilters(): void {
    // @ts-ignore
    this.srchObj = {zone: {}};
    this.getMainData();
  }

  downloadExcel(): void {
    window.open(this.service.getExcel(this.generateQueryParams()), '_blank');
  }

  generateQueryParams(): string {
    const params = new URLSearchParams();
    // tslint:disable-next-line:forin
    for (const key in this.filter) {
      // @ts-ignore
      params.set(key, this.filter[key]);
    }
    return params.toString();
  }

  getMainData(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getList(this.paginator.pageSize, this.paginator.pageIndex, this.utilService.encode(this.srchObj));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          // @ts-ignore
          this.resultsLength = data.total_count;
          // @ts-ignore
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  save(obj: City): void {
    this.service.create(obj).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', '');
      window.location.reload();
    }, error => {
      console.log(error.error);
      this.notifyService.showError(error.error ? error.error.error : 'ოპერაცია არ სრულდება', 'ჩანაწერის დამატება');
    });
  }

  update(obj: City): void {
    this.service.update(obj).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', '');
      window.location.reload();
    }, error => {
      this.notifyService.showError(!!error.error && error.error.includes('მითითებული') ? error.error : 'ოპერაცია არ სრულდება', 'ჩანაწერის განახლება');
      console.log(error);
    });
  }

  delete(obj: City): void {
    this.service.delete(obj.id).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', '');
      window.location.reload();
    }, error => {
      this.notifyService.showError('ოპერაცია არ სრულდება', 'ჩანაწერის წაშლა');
      console.log(error);
    });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(CityDialogContent, {
      data: obj,
    });
    // @ts-ignore
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (result.event === 'Add') {
          console.log(result);
          this.save(result.data);
        } else if (result.event === 'Update') {
          this.update(result.data);
        } else if (result.event === 'Delete') {
          this.delete(result.data);
        }
      }
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})

// tslint:disable-next-line:component-class-suffix
export class CityDialogContent implements OnInit {
  action: string;
  selectedObject: any;
  zones: Zone[] = [];


  constructor(public dialogRef: MatDialogRef<CityDialogContent>, private service: ZoneService,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: City) {
    this.selectedObject = {...data};
    this.action = this.selectedObject.action;
    if (!this.selectedObject.zone) {
      this.selectedObject.zone = {};
    }
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.selectedObject});
  }

  closeDialog(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.service.getList(10000, 0, '');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.zones = data;
    });
  }

}
