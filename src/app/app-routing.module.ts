import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ListproductComponent } from './listproduct/listproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { TaosanphamComponent } from './taosanpham/taosanpham.component';
import { TaoloaisanphamComponent } from './taoloaisanpham/taoloaisanpham.component';
import { AppmainComponent } from './appmain/appmain.component';
import { AppmainquanlyComponent } from './appmainquanly/appmainquanly.component';
import { AppmainnhanvienComponent } from './appmainnhanvien/appmainnhanvien.component';
import { ReviewspComponent } from './reviewsp/reviewsp.component';
import { QuanlyquyenTaikhoanComponent } from './quanlyquyen-taikhoan/quanlyquyen-taikhoan.component';
import { ThemtaikhoanComponent } from './themtaikhoan/themtaikhoan.component';
import { AddquyengroupComponent } from './addquyengroup/addquyengroup.component';
import { RepbinhluanComponent } from './repbinhluan/repbinhluan.component';
import { TatcadanhgiaComponent } from './tatcadanhgia/tatcadanhgia.component';
import { ThongkeComponent } from './thongke/thongke.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'appmainnv/login' },
  { path: 'appmain', pathMatch: 'full', redirectTo: 'appmain/products' },
  { path: 'appmainnv', pathMatch: 'full', redirectTo: 'appmainnv/login' },
  {
    path: 'appmainnv', component: AppmainnhanvienComponent, children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'quyentk', component: QuanlyquyenTaikhoanComponent
      },
      {
        path: 'addgroupquyen', component: AddquyengroupComponent
      },
      {
        path: 'taotk', component: ThemtaikhoanComponent
      },
      {
        path: 'appmainquanly', component: AppmainquanlyComponent
      },
      {
        path: 'taosanpham', component: TaosanphamComponent
      },
      {
        path: 'taoloaisanpham', component: TaoloaisanphamComponent
      },
      {
        path: 'reviewsp', component: ReviewspComponent
      },
      {
        path: 'repbinhluan', component: RepbinhluanComponent
      },
      {
        path: 'thongke', component: ThongkeComponent
      },
    ]
  },
  { path: 'products', component: ProductsComponent },
  { path: 'productdetails', component: ProductdetailsComponent },
  { path: 'listproduct', component: ListproductComponent },
  { path: 'tatcadanhgia', component: TatcadanhgiaComponent },
  {
    path: 'appmain', component: AppmainComponent, children: [
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'productdetails/:id', component: ProductdetailsComponent
      },
      {
        path: 'listproduct/:id', component: ListproductComponent
      },
      {
        path: 'tatcadanhgia/:id', component: TatcadanhgiaComponent
      },
    ]
  }
];

export const AppRoutingModule : ModuleWithProviders = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
