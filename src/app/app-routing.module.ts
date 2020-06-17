import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { TaosanphamComponent } from './taosanpham/taosanpham.component';
import { TaoloaisanphamComponent } from './taoloaisanpham/taoloaisanpham.component';
import { AppmainComponent} from './appmain/appmain.component';
import { AppmainquanlyComponent } from './appmainquanly/appmainquanly.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'appmain', pathMatch: 'full', redirectTo: 'appmain/products' },
  {path: 'login', component: LoginComponent},
  {path: 'appmainquanly', component: AppmainquanlyComponent},
  {path: 'taosanpham', component: TaosanphamComponent},
  {path: 'taoloaisanpham', component: TaoloaisanphamComponent},
  {path: 'appmain', component: AppmainComponent, children: [
          {
            path: 'products', component: ProductsComponent
          },
          {
          	path: 'taosanpham', component: TaosanphamComponent
          },
        ]
   }
];

export const AppRoutingModule : ModuleWithProviders = RouterModule.forRoot(routes);
