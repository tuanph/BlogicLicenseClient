import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementRoutes } from "./announcement.routes";
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { BusyModule } from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnnouncementRoutes,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BusyModule
  ],
  declarations: [AnnouncementComponent]
})
export class AnnouncementModule { }
