import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { RevenueComponent } from './revenue/revenue.component';
import { Routes, RouterModule } from '@angular/router';


let revenueRoutes: Routes = [
  { path: '', component: RevenueComponent },
  { path: '/revenue', component: RevenueComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(revenueRoutes),
    ChartsModule
  ],
  declarations: [RevenueComponent]
})
export class ReportModule { }
