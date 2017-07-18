import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';

export const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
