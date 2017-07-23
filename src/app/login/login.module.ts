import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { HttpModule } from '@angular/http';
export const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers: [AuthenService, UtilityService, NotificationService],
  declarations: [LoginComponent]
})
export class LoginModule { }
