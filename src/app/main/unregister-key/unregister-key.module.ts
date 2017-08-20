import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { UnregisterKeyComponent } from './unregister-key.component';

let unregisterKeyRouters: Routes = [
  {
    path: '', component: UnregisterKeyComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(unregisterKeyRouters),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    Daterangepicker
  ],
  declarations: [UnregisterKeyComponent]
})
export class UnregisterKeyModule { }
