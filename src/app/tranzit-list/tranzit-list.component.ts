import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {MatTableDataSource} from '@angular/material/table';
import {UserBackendApi, UserService} from '../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../services/notification.service';
import {UtilService} from '../services/util.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {City} from '../models/city';
import {CityService} from '../services/city.service';
import {Tranzit} from '../models/tranzit';
import {TranzitService} from '../services/tranzit.service';
import {CarService} from '../services/car.service';
import {WarehouseService} from '../services/warehouse.service';
import {Warehouse} from '../models/warehouse';
import {Car} from '../models/car';

@Component({
  selector: 'app-tranzit-list',
  templateUrl: './tranzit-list.component.html',
  styleUrls: ['./tranzit-list.component.scss']
})
export class TranzitListComponent implements AfterViewInit {
  // @ts-ignore
  srchObj: Tranzit = {};
  data = new MatTableDataSource<UserBackendApi>();
  displayedColumns: string[] = ['number', 'car', 'driver', 'senderWarehouse', 'destWarehouse', 'tranzitDate', 'action'];

  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, private service: TranzitService,
              private notifyService: NotificationService, private utilService: UtilService) {
  }

  ngAfterViewInit(): void {
    this.getMainData();
  }

  getMainData(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // @ts-ignore
          return this.service.getList(this.paginator.pageSize, this.paginator.pageIndex, this.utilService.encode(this.srchObj, ''));
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

  save(obj: Tranzit): void {
    this.service.create(obj).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', 'ჩანაწერის დამატება');
      window.location.reload();
    }, error => {
      this.notifyService.showError(!!error.error && error.error.includes('მითითებული') ? error.error : 'ოპერაცია არ სრულდება', 'ჩანაწერის დამატება');
      console.log(error);
    });
  }

  update(obj: Tranzit): void {
    this.service.update(obj).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', 'ჩანაწერის განახლება');
      window.location.reload();
    }, error => {
      this.notifyService.showError(!!error.error && error.error.includes('მითითებული') ? error.error : 'ოპერაცია არ სრულდება', 'ჩანაწერის განახლება');
      console.log(error);
    });
  }

  delete(obj: Tranzit): void {
    this.service.delete(obj.id).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', 'ჩანაწერის წაშლა');
      window.location.reload();
    }, error => {
      this.notifyService.showError('ოპერაცია არ სრულდება', 'ჩანაწერის წაშლა');
      console.log(error);
    });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(TranzitDialogContent, {data: obj, maxWidth: '50%'});
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
export class TranzitDialogContent implements OnInit {
  action: string;
  selectedObject: any;
  senderWarehouseList: Warehouse [] = [];
  destWarehouseList: Warehouse [] = [];
  cityList: City [] = [];
  driversList: User [] = [];
  carsList: Car [] = [];
  // @ts-ignore
  // driverSrchObj: User = ;

  constructor(public dialogRef: MatDialogRef<TranzitDialogContent>,
              private carSrvice: CarService,
              private cityService: CityService,
              private userService: UserService,
              private warehouseService: WarehouseService,
              private utilService: UtilService,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Tranzit) {
    this.selectedObject = {...data};
    this.action = this.selectedObject.action;
    if (!this.selectedObject.car) {
      this.selectedObject.car = {};
    }
    if (!this.selectedObject.routeFrom) {
      this.selectedObject.routeFrom = {};
    } else {
      this.onFromCitySelect(this.selectedObject.routeFrom.id);
    }
    if (!this.selectedObject.routeTo) {
      this.selectedObject.routeTo = {};
    } else {
      this.onToCitySelect(this.selectedObject.routeTo.id);
    }
    if (!this.selectedObject.driver) {
      this.selectedObject.driver = {};
    }
    if (!this.selectedObject.senderWarehouse) {
      this.selectedObject.senderWarehouse = {};
    }
    if (!this.selectedObject.destWarehouse) {
      this.selectedObject.destWarehouse = {};
    }
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.selectedObject});
  }

  closeDialog(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  onFromCitySelect(selectedCityId: number): void {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.warehouseService.getByCityId(selectedCityId);
      }),
      map(data => {
        // @ts-ignore
        return data;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.senderWarehouseList = data;
    });
  }

  onToCitySelect(selectedCityId: number): void {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.warehouseService.getByCityId(selectedCityId);
      }),
      map(data => {
        // @ts-ignore
        return data;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.destWarehouseList = data;
    });
  }

  ngOnInit(): void {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.carSrvice.getList(1000, 0, '');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.carsList = data;
    });
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.cityService.getList(1000, 0, '');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.cityList = data;
    });
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.userService.getList(1000, 0, '&srchRoleName=DRIVER');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.driversList = data;
    });
  }
}
