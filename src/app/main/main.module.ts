import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent]
})
export class MainModule { }
