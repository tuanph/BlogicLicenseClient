import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service'
import { TreeModule } from 'angular-tree-component';

let functionRoutes: Routes = [
  { path: '', component: FunctionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(functionRoutes),
    FormsModule,
    ModalModule.forRoot(),
    TreeModule
  ],
  providers: [DataService, NotificationService, UtilityService],
  declarations: [FunctionComponent]
})
export class FunctionModule { }
