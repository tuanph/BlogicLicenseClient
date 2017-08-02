import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementRoutes } from "./announcement.routes";
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnnouncementRoutes,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [AnnouncementComponent]
})
export class AnnouncementModule { }
