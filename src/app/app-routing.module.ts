import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { TaosanphamComponent } from './taosanpham/taosanpham.component';
import { TaoloaisanphamComponent } from './taoloaisanpham/taoloaisanpham.component';
import { AppmainComponent} from './appmain/appmain.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'taosanpham', component: TaosanphamComponent},
  {path: 'taoloaisanpham', component: TaoloaisanphamComponent},
  {path: 'appmain', component: AppmainComponent}
];

export const AppRoutingModule : ModuleWithProviders = RouterModule.forRoot(routes);
