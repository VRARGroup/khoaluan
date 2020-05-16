import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products' },
  {path: 'products', component: ProductsComponent}
];

export const AppRoutingModule : ModuleWithProviders = RouterModule.forRoot(routes);
