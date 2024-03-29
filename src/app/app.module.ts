import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FullComponent} from './layouts/full/full.component';
import {AppBlankComponent} from './layouts/blank/blank.component';


import {VerticalAppHeaderComponent} from './layouts/full/vertical-header/vertical-header.component';
import {VerticalAppSidebarComponent} from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './demo-material-module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedModule} from './shared/shared.module';
import {SpinnerComponent} from './shared/spinner.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';


import {FeatherModule} from 'angular-feather';
import {
  Activity,
  Airplay,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Anchor,
  Aperture,
  Archive,
  ArrowDown,
  ArrowDownCircle,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
  ArrowUp,
  ArrowUpCircle,
  ArrowUpLeft,
  ArrowUpRight,
  AtSign,
  Award,
  BarChart,
  BarChart2,
  Battery,
  BatteryCharging,
  Bell,
  BellOff,
  Bluetooth,
  Bold,
  Book,
  Bookmark,
  BookOpen,
  Box,
  Briefcase,
  Calendar,
  Camera,
  CameraOff,
  Cast,
  Check,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  ChevronUp,
  Chrome,
  Circle,
  Clipboard,
  Clock,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudOff,
  CloudRain,
  CloudSnow,
  Code,
  Codepen,
  Codesandbox,
  Coffee,
  Columns,
  Command,
  Compass,
  Copy,
  CornerDownLeft,
  CornerDownRight,
  CornerLeftDown,
  CornerLeftUp,
  CornerRightDown,
  CornerRightUp,
  CornerUpLeft,
  CornerUpRight,
  Cpu,
  CreditCard,
  Crop,
  Crosshair,
  Database,
  Delete,
  Disc,
  DollarSign,
  Download,
  DownloadCloud,
  Droplet,
  Edit,
  Edit2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Facebook,
  FastForward,
  Feather,
  Figma,
  File,
  FileMinus,
  FilePlus,
  FileText,
  Film,
  Filter,
  Flag,
  Folder,
  FolderMinus,
  FolderPlus,
  Framer,
  Frown,
  Gift,
  GitBranch,
  GitCommit,
  Github,
  Gitlab,
  GitMerge,
  GitPullRequest,
  Globe,
  Grid,
  HardDrive,
  Hash,
  Headphones,
  Heart,
  HelpCircle,
  Hexagon,
  Home,
  Image,
  Inbox,
  Info,
  Instagram,
  Italic,
  Key,
  Layers,
  Layout,
  LifeBuoy,
  Link,
  Link2,
  Linkedin,
  List,
  Loader,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Map,
  MapPin,
  Maximize,
  Maximize2,
  Meh,
  Menu,
  MessageCircle,
  MessageSquare,
  Mic,
  MicOff,
  Minimize,
  Minimize2,
  Minus,
  MinusCircle,
  MinusSquare,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  MousePointer,
  Move,
  Music,
  Navigation,
  Navigation2,
  Octagon,
  Package,
  Paperclip,
  Pause,
  PauseCircle,
  PenTool,
  Percent,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  PhoneOff,
  PhoneOutgoing,
  PieChart,
  Play,
  PlayCircle,
  Plus,
  PlusCircle,
  PlusSquare,
  Pocket,
  Power,
  Printer,
  Radio,
  RefreshCcw,
  RefreshCw,
  Repeat,
  Rewind,
  RotateCcw,
  RotateCw,
  Rss,
  Save,
  Scissors,
  Search,
  Send,
  Server,
  Settings,
  Share,
  Share2,
  Shield,
  ShieldOff,
  ShoppingBag,
  ShoppingCart,
  Shuffle,
  Sidebar,
  SkipBack,
  SkipForward,
  Slack,
  Slash,
  Sliders,
  Smartphone,
  Smile,
  Speaker,
  Square,
  Star,
  StopCircle,
  Sun,
  Sunrise,
  Sunset,
  Tablet,
  Tag,
  Target,
  Terminal,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  ToggleLeft,
  ToggleRight,
  Tool,
  Trash,
  Trash2,
  Trello,
  TrendingDown,
  TrendingUp,
  Triangle,
  Truck,
  Tv,
  Twitch,
  Twitter,
  Type,
  Umbrella,
  Underline,
  Unlock,
  Upload,
  UploadCloud,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  UserX,
  Video,
  VideoOff,
  Voicemail,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Watch,
  Wifi,
  WifiOff,
  Wind,
  X,
  XCircle,
  XOctagon,
  XSquare,
  Youtube,
  Zap,
  ZapOff,
  ZoomIn,
  ZoomOut
} from 'angular-feather/icons';
import {CarAddDialogContent, CarListComponent} from './car-list/car-list.component';
import {ToastrModule} from 'ngx-toastr';
import {ZoneDialogContent, ZoneListComponent} from './zone-list/zone-list.component';
import {UserDialogContent, UserListComponent} from './user-list/user-list.component';
import {WarehouseDialogContent, WarehouseListComponent} from './warehouse-list/warehouse-list.component';
import {TranzitDialogContent, TranzitListComponent} from './tranzit-list/tranzit-list.component';
import {ServiceDialogContent, ServiceListComponent} from './service-list/service-list.component';
import {RouteDialogContent, RouteListComponent} from './route-list/route-list.component';
import {ContactDialogContent, ContactListComponent} from './contact-list/contact-list.component';
import {CityDialogContent, CityListComponent} from './city-list/city-list.component';
import {ContactAddressComponent, ContactAddressDialogContent} from './contact-address/contact-address.component';
import {JwtInterceptor} from './authentication/jwt.interceptor';
import {ParcelStatusDialogContent, ParcelStatusListComponent} from './parcel-status-list/parcel-status-list.component';
import {
  ParcelStatusReasonDC,
  ParcelStatusReasonsComponent
} from './parcel-status-reasons/parcel-status-reasons.component';
import {TariffDialogContent, TariffListComponent} from './tariff-list/tariff-list.component';
import {TariffDetailsComponent} from './tariff-details/tariff-details.component';
import {ParcelDC, ParcelListComponent} from './parcel-list/parcel-list.component';
import {ParcelFormComponent, ParcelFormPrintDialogContent} from './parcel-form/parcel-form.component';
import {DocTypeDC, DoctypesComponent} from './doctypes/doctypes.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import {ParcelDetailsComponent} from './parcel-details/parcel-details.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ExcelImportComponent, ExcelRowDialogContent} from './excel-import/excel-import.component';
import {PrintComponent} from './print/print.component';
import {
  DeliveryDetailsComponent,
  DeliveryDetailsDialogContent,
  ParcelEditDlgContent
} from './delivery-details/delivery-details.component';
import {BagDialogContent, BagListComponent} from './bag-list/bag-list.component';
import {MatSelectFilterModule} from 'mat-select-filter';
import {StatusManagerComponent} from './status-manager/status-manager.component';
import {WaybillListComponent} from './waybill-list/waybill-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {InvoiceDialogContent, InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoicePregenerationComponent} from './invoice-pregeneration/invoice-pregeneration.component';
import {InvoiceGenerationComponent} from "./invoice-generation/invoice-generation.component";


// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

// Select some icons (use an object, not an array)
const icons = {
  Camera,
  Heart,
  Github,
  Activity,
  Airplay,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Anchor,
  Aperture,
  Archive,
  ArrowDown,
  ArrowDownCircle,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeftCircle,
  ArrowLeft,
  ArrowRight,
  ArrowRightCircle,
  ArrowUp,
  ArrowUpCircle,
  ArrowUpLeft,
  ArrowUpRight,
  AtSign,
  Award,
  BarChart2,
  BarChart,
  BatteryCharging,
  Battery,
  BellOff,
  Bell,
  Bluetooth,
  Bold,
  BookOpen,
  Book,
  Bookmark,
  Box,
  Briefcase,
  Calendar,
  CameraOff,
  Cast,
  CheckCircle,
  CheckSquare,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  Chrome,
  Circle,
  Clipboard,
  Clock,
  CloudDrizzle,
  CloudLightning,
  CloudOff,
  CloudRain,
  Cloud,
  CloudSnow,
  Code,
  Codepen,
  Codesandbox,
  Coffee,
  Columns,
  Command,
  Compass,
  Copy,
  CornerDownLeft,
  CornerDownRight,
  CornerLeftDown,
  CornerLeftUp,
  CornerRightDown,
  CornerRightUp,
  CornerUpLeft,
  CornerUpRight,
  Cpu,
  CreditCard,
  Crop,
  Crosshair,
  Database,
  Delete,
  Disc,
  DollarSign,
  DownloadCloud,
  Download,
  Droplet,
  Edit,
  Edit2,
  Edit3,
  ExternalLink,
  EyeOff,
  Eye,
  Facebook,
  FastForward,
  Feather,
  Figma,
  FileMinus,
  FilePlus,
  FileText,
  File,
  Film,
  Filter,
  Flag,
  Folder,
  FolderMinus,
  FolderPlus,
  Framer,
  Frown,
  Gift,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Gitlab,
  Globe,
  Grid,
  HardDrive,
  Hash,
  Headphones,
  HelpCircle,
  Hexagon,
  Home,
  MoreHorizontal,
  Image,
  Inbox,
  Info,
  Instagram,
  Italic,
  Key,
  Layers,
  Layout,
  LifeBuoy,
  Link,
  Link2,
  Linkedin,
  List,
  Loader,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Map,
  Maximize,
  Maximize2,
  Meh,
  Menu,
  MessageCircle,
  MessageSquare,
  Mic,
  MicOff,
  Minimize,
  Minimize2,
  MinusCircle,
  MinusSquare,
  Minus,
  Monitor,
  Moon,
  MoreVertical,
  MousePointer,
  Move,
  Music,
  Navigation,
  Navigation2,
  Octagon,
  Package,
  Paperclip,
  PauseCircle,
  Pause,
  PenTool,
  Percent,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  Phone,
  PhoneOff,
  PhoneOutgoing,
  PieChart,
  Play,
  PlayCircle,
  Plus,
  PlusCircle,
  PlusSquare,
  Pocket,
  Power,
  Printer,
  Radio,
  RefreshCcw,
  RefreshCw,
  Repeat,
  Rewind,
  RotateCcw,
  RotateCw,
  Rss,
  Save,
  Scissors,
  Search,
  Send,
  Server,
  Settings,
  Share,
  Share2,
  Shield,
  ShieldOff,
  ShoppingBag,
  ShoppingCart,
  Shuffle,
  Sidebar,
  SkipBack,
  SkipForward,
  Slack,
  Slash,
  Sliders,
  Smartphone,
  Smile,
  Speaker,
  Square,
  Star,
  StopCircle,
  Sun,
  Sunrise,
  Sunset,
  Tablet,
  Tag,
  Target,
  Terminal,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  ToggleLeft,
  ToggleRight,
  Tool,
  Trash,
  Trash2,
  Trello,
  TrendingDown,
  TrendingUp,
  Triangle,
  Truck,
  Tv,
  Twitch,
  Twitter,
  Type,
  Umbrella,
  Underline,
  Unlock,
  Upload,
  UploadCloud,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  UserX,
  Users,
  Video,
  VideoOff,
  Voicemail,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Watch,
  Wifi,
  WifiOff,
  Wind,
  XCircle,
  XOctagon,
  XSquare,
  X,
  Youtube,
  Zap,
  ZapOff,
  ZoomIn,
  ZoomOut
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    VerticalAppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    VerticalAppSidebarComponent,
    CityListComponent,
    CarListComponent,
    CarAddDialogContent,
    CityDialogContent,
    ContactDialogContent,
    ContactAddressDialogContent,
    DeliveryDetailsDialogContent,
    UserDialogContent,
    RouteDialogContent,
    ExcelRowDialogContent,
    ServiceDialogContent,
    WarehouseDialogContent,
    BagDialogContent,
    ParcelFormPrintDialogContent,
    ParcelDC,
    DocTypeDC,
    ParcelStatusDialogContent,
    TariffDialogContent,
    ParcelEditDlgContent,
    ParcelStatusReasonDC,
    ZoneDialogContent,
    TranzitDialogContent,
    ContactListComponent,
    RouteListComponent,
    ServiceListComponent,
    TranzitListComponent,
    WarehouseListComponent,
    UserListComponent,
    ZoneListComponent,
    ContactAddressComponent,
    ParcelStatusListComponent,
    ParcelStatusReasonsComponent,
    TariffListComponent,
    TariffDetailsComponent,
    ParcelListComponent,
    ParcelFormComponent,
    DoctypesComponent,
    ParcelDetailsComponent,
    FileUploadComponent,
    ConfirmDialogComponent,
    ExcelImportComponent,
    PrintComponent,
    DeliveryDetailsComponent,
    BagListComponent,
    StatusManagerComponent,
    WaybillListComponent,
    InvoiceListComponent,
    InvoiceDialogContent,
    InvoicePregenerationComponent,
    InvoiceGenerationComponent
  ],
  imports: [
    MatSelectFilterModule,
    NgxBarcodeModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(AppRoutes, {relativeLinkResolution: 'legacy'}),
    HttpClientModule,
    FeatherModule.pick(icons),
    FeatherModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule, NgxMatTimepickerModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
