import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-unregister-key',
  templateUrl: './unregister-key.component.html',
  styleUrls: ['./unregister-key.component.css']
})
export class UnregisterKeyComponent implements OnInit {


  public dateOptions: any = {
    locale: { format: 'MM/DD/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalItems: number;
  public filter: string = "";
  public keys: string = "";
  public softwares: any[];
  public stores: any[];
  public currentStoreId: number = 1;
  constructor(private dataService: DataService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getStores();
    this.getSoftwares();
    this.getUnregisterKeys();
  }

  public getUnregisterKeys(): any {
    let url = "/api/unregisterKey/getlistpaging?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "&filter=" + this.filter;
    this.dataService.get(url)
      .subscribe((response: any) => {
        this.keys = response.items;
        this.totalItems = response.totalRows;
      });
  }

  public getSoftwares() {
    let url = "/api/software/getall";
    this.dataService.get(url)
      .subscribe((response: any) => {
        this.softwares = response;
      });
  }
  public getStores() {
    let url = "/api/store/gellAllWithOutProductKey";
    this.dataService.get(url)
      .subscribe((response: any) => {
        this.stores = response;
      });
  }

  public pageChanged(event: any) {
    this.pageIndex = event.page;
    this.getUnregisterKeys();
  }


}
