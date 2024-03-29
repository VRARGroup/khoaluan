import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListproductComponent } from './listproduct/listproduct.component';

import {
    MatCommonModule, 
    MatFormFieldModule, 
    MatLineModule, MatOptionModule

} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TaosanphamComponent } from './taosanpham/taosanpham.component';
import { TaoloaisanphamComponent } from './taoloaisanpham/taoloaisanpham.component';
import { AppmainComponent } from './appmain/appmain.component';
import { AppmainquanlyComponent } from './appmainquanly/appmainquanly.component';
import { AppmainnhanvienComponent } from './appmainnhanvien/appmainnhanvien.component';
import { ReviewspComponent } from './reviewsp/reviewsp.component';
import { extendPrototype } from 'localforage-startswith';
import { ModalThongsokythuatComponent } from './modal/modal-thongsokythuat/modal-thongsokythuat.component';
import { QuanlyquyenTaikhoanComponent } from './quanlyquyen-taikhoan/quanlyquyen-taikhoan.component';
import { ThemtaikhoanComponent } from './themtaikhoan/themtaikhoan.component';
import { AddquyengroupComponent } from './addquyengroup/addquyengroup.component';
import { ModalthemuseComponent } from './modalthemuse/modalthemuse.component';
import { ModalDanhgiaComponent } from './modal/modal-danhgia/modal-danhgia.component';
import { RepbinhluanComponent } from './repbinhluan/repbinhluan.component';
import { ModalDanhgiaphuComponent } from './modal/modal-danhgiaphu/modal-danhgiaphu.component';
import { TatcadanhgiaComponent } from './tatcadanhgia/tatcadanhgia.component';
import { ModalBinhluanphuComponent } from './modal/modal-binhluanphu/modal-binhluanphu.component';
import { ThongkeComponent } from './thongke/thongke.component';
import { ModalDoipassComponent } from './modal/modal-doipass/modal-doipass.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    LoginComponent,
    UserComponent,
    TaosanphamComponent,
    TaoloaisanphamComponent,
    AppmainComponent,
    AppmainquanlyComponent,
    AppmainnhanvienComponent,
    ReviewspComponent,
    ProductdetailsComponent,
    ModalThongsokythuatComponent,
    ListproductComponent,
    QuanlyquyenTaikhoanComponent,
    ThemtaikhoanComponent,
    AddquyengroupComponent,
    ModalthemuseComponent,
    ModalDanhgiaComponent,
    RepbinhluanComponent,
    ModalDanhgiaphuComponent,
    TatcadanhgiaComponent,
    ModalBinhluanphuComponent,
    ThongkeComponent,
    ModalDoipassComponent,
  ],
  imports: [
    
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FlexLayoutModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatCommonModule, 
    MatFormFieldModule, 
    MatLineModule, MatOptionModule,
    CarouselModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [ ModalThongsokythuatComponent,  ModalthemuseComponent, ModalDanhgiaComponent, ModalDanhgiaphuComponent, ModalBinhluanphuComponent, ModalDoipassComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
