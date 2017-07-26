import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service'

let userRouter: Routes = [
  { path: '', component: UserComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRouter),
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataService, NotificationService, UtilityService],
  declarations: [UserComponent]
})
export class UserModule { }
