import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProductsComponent } from './products/products.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent}
];

export const AppRoutingModule : ModuleWithProviders = RouterModule.forRoot(routes);
