import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { AuthenService } from '../../app/core/services/authen.service';
import { HttpModule } from '@angular/http';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    HttpModule
  ],
  providers: [AuthenService],
  declarations: [MainComponent]
})
export class MainModule { }
