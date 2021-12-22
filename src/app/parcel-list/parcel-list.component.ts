import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../services/notification.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ParcelBackendApi, ParcelService} from '../services/parcel.service';
import {Parcel} from '../models/parcel';
import {UtilService} from '../services/util.service';
import {Service} from '../models/service';
import {CompanyServicesService} from '../services/company-services.service';
import {DoctypesService} from '../services/doctypes.service';
import {DocType} from '../models/doc-type';
import {ParcelStatusReason} from '../models/parcel-status-reason';
import {ParcelStatusService} from '../services/parcel-status.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.scss']
})
export class ParcelListComponent implements AfterViewInit {
  // @ts-ignore
  srchObj: Parcel = {};
  data = new MatTableDataSource<ParcelBackendApi>();
  displayedColumns: string[] = ['id', 'senderName', 'receiverName', 'payerName', 'weight', 'totalPrice', 'status', 'createdTime', 'action'];

  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, private service: ParcelService, private router: Router,
              private notifyService: NotificationService, private utilService: UtilService) {
  }

  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.resultsLength = 0;
    this.getMainData();
  }

  getMainData(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getList(this.paginator.pageSize, this.paginator.pageIndex, this.utilService.encode(this.srchObj, ''));
        }),
        map(data => {
          console.log(data);
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

  save(obj: Parcel): void {
    this.service.create(obj).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', '');
      window.location.reload();
    }, error => {
      this.notifyService.showError(!!error.error && error.error.includes('მითითებული') ? error.error : 'ოპერაცია არ სრულდება', 'ჩანაწერის განახლება');
      console.log(error);
    });
  }

  update(obj: Parcel): void {
    this.service.update(obj).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', '');
      window.location.reload();
    }, error => {
      this.notifyService.showError(!!error.error && error.error.includes('მითითებული') ? error.error : 'ოპერაცია არ სრულდება', 'ჩანაწერის განახლება');
      console.log(error);
    });
  }

  delete(obj: Parcel): void {
    this.service.delete(obj.id).subscribe(() => {
      this.notifyService.showSuccess('ოპერაცია დასრულდა წარმატებით', '');
      window.location.reload();
    }, error => {
      this.notifyService.showError('ოპერაცია არ სრულდება', 'ჩანაწერის წაშლა');
      console.log(error);
    });
  }

  redirectToDetailsPage(obj: Parcel): void {
    this.router.navigate(['parcel-details/' + obj.id]);
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ParcelDC, {data: obj, width: '50%'});
    // @ts-ignore
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (result.event === 'statusChange') {
          console.log('changing parcels status');
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
export class ParcelDC implements OnInit {
  action: string;
  selectedObject: any;
  services!: Service[];
  statuses!: ParcelStatusReason[];
  docTypes!: DocType[];

  constructor(public dialogRef: MatDialogRef<ParcelDC>,
              private companyServices: CompanyServicesService,
              private docTypeService: DoctypesService,
              private statusService: ParcelStatusService,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Parcel) {
    this.selectedObject = {...data};
    this.action = this.selectedObject.action;
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.selectedObject});
  }

  closeDialog(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.companyServices.getList(1000, 0, '');
        }),
        map(data => {
          console.log(data);
          // @ts-ignore
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.services = data);

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.docTypeService.getList(1000, 0, '');
        }),
        map(data => {
          // @ts-ignore
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.docTypes = data);

    if (this.action === 'statusChange') {
      merge()
        .pipe(
          startWith({}),
          switchMap(() => {
            return this.statusService.getAllStatusReasons();
          }),
          map(data => {
            // @ts-ignore
            return data.items;
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.statuses = data);
    }
  }
}
