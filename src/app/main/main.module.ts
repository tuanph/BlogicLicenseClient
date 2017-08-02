import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { AuthenService } from '../../app/core/services/authen.service';
import { DataService } from '../../app/core/services/data.service';
import { SignalrService } from '../../app/core/services/signalr.service';
import { NotificationService } from '../../app/core/services/notification.service';
import { UtilityService } from '../../app/core/services/utility.service';
import { HttpModule } from '@angular/http';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    HttpModule
  ],
  providers: [AuthenService, DataService, NotificationService, UtilityService, SignalrService],
  declarations: [MainComponent, SidebarMenuComponent, TopMenuComponent]
})
export class MainModule { }
