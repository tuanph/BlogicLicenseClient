import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { Routes, RouterModule } from '@angular/router';

import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';

let productCategoryRoutes: Routes = [
  { path: '', component: ProductCategoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    ModalModule,
    FormsModule,
    RouterModule.forChild(productCategoryRoutes),
    ModalModule.forRoot()
  ],
  providers: [DataService, UtilityService],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule {
  
}
