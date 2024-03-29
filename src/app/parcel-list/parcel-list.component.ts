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
import {User} from '../models/user';
import {TokenStorageService} from '../services/token-storage.service';
import {ParcelDTO} from '../models/parcel-dto';
import {City} from '../models/city';
import {CityService} from '../services/city.service';
import {ParcelStatus} from '../models/parcel-status';
import {RouteService} from '../services/route.service';
import {Route} from '../models/route';
import {UserService} from '../services/user.service';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ParcelStatuses} from '../models/parcel-statuses.enum';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.scss']
})
export class ParcelListComponent implements AfterViewInit, OnInit {
  // @ts-ignore
  srchObj: ParcelDTO = {};
  data = new MatTableDataSource<ParcelBackendApi>();
  displayedColumns: string[] = ['barCode', 'senderName', 'senderCity', 'receiverName', 'receiverCity', 'weight', 'totalPrice', 'status', 'action'];

  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);
  currentUser!: User;
  public filteredSenderCitiesList: City[] = [];
  public filteredReceiverCitiesList: City[] = [];
  public filteredPayerCitiesList: City[] = [];
  cities: City [] = [];
  routes!: Route[];
  couriers!: User[];
  statuses!: ParcelStatus[];
  public filteredStatuses: ParcelStatus[] = [];
  statusReasons!: ParcelStatusReason[];
  public filteredStatusReasons: ParcelStatusReason[] = [];
  services!: Service[];

  public dateControl1 = new FormControl();
  public dateControl2 = new FormControl();
  public dateControl3 = new FormControl();
  public dateControl4 = new FormControl();

  constructor(public dialog: MatDialog, private service: ParcelService, private companyServices: CompanyServicesService,
              private router: Router, private tokenStorageService: TokenStorageService, private routeService: RouteService,
              private cityService: CityService, private statusService: ParcelStatusService, private userService: UserService,
              private datePipe: DatePipe,
              private notifyService: NotificationService, private utilService: UtilService) {
    this.initSubParams();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }

  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.resultsLength = 0;
    this.initSubParams();
    this.getMainData();
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.cityService.getList(1000, 0, '');
      }),
      map(data => {
        // @ts-ignore
        this.cities = data.items;
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.cities = data;
      this.filteredSenderCitiesList = this.cities.slice();
      this.filteredReceiverCitiesList = this.cities.slice();
      this.filteredPayerCitiesList = this.cities.slice();
    });

    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.statusService.getList(1000, 0, '');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.statuses = data;
      this.filteredStatuses = this.statuses.slice();
    });

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.companyServices.getList(1000, 0, '');
        }),
        map(data => {
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
          return this.routeService.getList(1000, 0, '');
        }),
        map(data => {
          // @ts-ignore
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.routes = data);

    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.userService.getList(1000, 0, '&srchRoleName=COURIER');
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.couriers = data;
    });
  }

  onStatusSelect(selectedStatusId: number): void {
    merge().pipe(
      startWith({}),
      switchMap(() => {
        return this.statusService.getByParcelStatusId(this.srchObj.statusId);
      }),
      map(data => {
        // @ts-ignore
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.statusReasons = data;
      this.filteredStatusReasons = this.statusReasons.slice();
      this.getMainData();
    });
  }

  passChangeEnableDisable(event: any): void {
    this.srchObj.prePrinted = event.checked;
    console.log(event.checked);
  }

  addedFromGlobalHandler(event: any): void {
    this.srchObj.addedFromGlobal = event.checked;
  }

  clearFilters(): void {
    this.initSubParams();
    this.getMainData();
  }

  initSubParams(): void {
    // @ts-ignore
    this.srchObj = {};
    this.dateControl1 = new FormControl();
    this.dateControl2 = new FormControl();
    this.dateControl3 = new FormControl();
    this.dateControl4 = new FormControl();
    //   // @ts-ignore
    //   this.srchObj.senderCity = {};
    //   // @ts-ignore
    //   this.srchObj.route = {};
    //   // @ts-ignore
    //   this.srchObj.author = {};
    //   // @ts-ignore
    //   this.srchObj.courier = {};
    //   // @ts-ignore
    //   this.srchObj.payerCity = {};
    //   // @ts-ignore
    //   this.srchObj.receiverCity = {};
    //   // @ts-ignore
    //   this.srchObj.status = {};
    //   // @ts-ignore
    //   this.srchObj.service = {};
  }

  prepareDatesForSearch(): void {
    if (this.dateControl1.value) {
      // @ts-ignore
      this.srchObj.strDeliveryTime = this.datePipe.transform(new Date(this.dateControl1.value), 'yyyy-MM-ddTHH:mm:ss');
    }
    if (this.dateControl2.value) {
      // @ts-ignore
      this.srchObj.strDeliveryTimeTo = this.datePipe.transform(new Date(this.dateControl2.value), 'yyyy-MM-ddTHH:mm:ss');
    }
    if (this.dateControl3.value) {
      // @ts-ignore
      this.srchObj.strCreatedTime = this.datePipe.transform(new Date(this.dateControl3.value), 'yyyy-MM-ddTHH:mm:ss');
    }
    if (this.dateControl4.value) {
      // @ts-ignore
      this.srchObj.strCreatedTimeTo = this.datePipe.transform(new Date(this.dateControl4.value), 'yyyy-MM-ddTHH:mm:ss');
    }
    console.log(this.srchObj);
  }

  getMainData(): void {
    this.prepareDatesForSearch();
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getList(this.paginator.pageSize, this.paginator.pageIndex, this.utilService.encode(this.srchObj));
        }),
        map(data => {
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

  printStiker(): void {
    // @ts-ignore
    const stickerDivElements = document.getElementById('printStickerContent').innerHTML;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // @ts-ignore
    popupWin.document.open();
    // @ts-ignore
    popupWin.document.write(`<html><head><style>body { -webkit-print-color-adjust: exact !important; }</style></head><body onload="window.print();window.close()">${stickerDivElements}</body></html>`);
    // @ts-ignore
    popupWin.document.close();
  }

  redirectToDetailsPage(obj: Parcel): void {
    this.router.navigate(['parcel-details/' + obj.id]);
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    let dialogRef;
    if (action === 'fileUpload') {
      dialogRef = this.dialog.open(ParcelDC, {data: obj, width: '80%'});
    } else if (action === 'Print') {
      dialogRef = this.dialog.open(ParcelDC, {data: obj});
    } else {
      dialogRef = this.dialog.open(ParcelDC, {data: obj, width: '50%'});
    }
    // @ts-ignore
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (result.event === 'statusChange') {
          console.log('changing parcels status');
          this.update(result.data);
        } else if (result.event === 'Delete') {
          this.delete(result.data);
        } else if (result.event === 'Print') {
          // result.data.printStikerOrZednadebi - 1 print sticker, 2 print zednadebi
          console.log('printCopiesCount ', result.data);
        }
      }
    });
  }

  detectColorByStatus(statusId: number): string {
    let style = 'background:';
    switch (statusId) {
      case ParcelStatuses.PP:
        style += '#7e77a7;';
        break;
      case ParcelStatuses.RG:
        style += '#f0e68c;';
        break;
      case ParcelStatuses.SE:
        style += '#d3d3d3;';
        break;
      case ParcelStatuses.RP:
        style += '#ff8000;';
        break;
      case ParcelStatuses.PU:
        style += 'cyan;';
        break;
      default:
        break;
    }
    return style;
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})

// tslint:disable-next-line:component-class-suffix
export class ParcelDC implements AfterViewInit {
  action: string;
  selectedObject: any;
  services!: Service[];
  statuses!: ParcelStatusReason[];
  docTypes!: DocType[];

  printStikerOrZednadebi = 1; // 1 print sticker, 2 print zednadebi
  printCopiesCount = 1;

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

  printAction(): void {
    this.dialogRef.close({
      event: this.action,
      data: {
        selectedObject: this.selectedObject,
        printStikerOrZednadebi: this.printStikerOrZednadebi,
        printCopiesCount: this.printCopiesCount
      }
    });
    this.printStikerOrZednadebi = 1;
    this.printCopiesCount = 1;
  }

  closeDialog(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngAfterViewInit(): void {
    if (this.action === 'Print') {
      return;
    }
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
