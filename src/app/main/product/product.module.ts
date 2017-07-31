import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { UploadService } from './../../core/services/upload.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SimpleTinyComponent } from '../../shared/simple-tiny/simple-tiny.component';
let productRoutes: Routes = [
  { path: '', component: ProductComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    Daterangepicker,
    MultiselectDropdownModule
  ],
  providers: [DataService, UtilityService, UploadService],
  declarations: [ProductComponent, SimpleTinyComponent]
})
export class ProductModule { }
