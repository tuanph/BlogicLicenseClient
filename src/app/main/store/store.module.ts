import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store.component';
import { Daterangepicker } from 'ng2-daterangepicker';

let storeRouters: Routes = [
  {
    path: '', component: StoreComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(storeRouters),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    Daterangepicker
  ],
  providers: [DataService, NotificationService, UtilityService],
  declarations: [StoreComponent]
})
export class StoreModule { }
