import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

let roleRouter: Routes = [
  {
    path: '', component: RoleComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(roleRouter),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataService, NotificationService, UtilityService],
  declarations: [RoleComponent]
})
export class RoleModule { }
