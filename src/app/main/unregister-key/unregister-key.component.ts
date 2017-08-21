import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';
// import {DaterangePickerComponent} from 'ng2-daterangepicker';
import { Daterangepicker } from 'ng2-daterangepicker';

@Component({
  selector: 'app-unregister-key',
  templateUrl: './unregister-key.component.html',
  styleUrls: ['./unregister-key.component.css']
})
export class UnregisterKeyComponent implements OnInit {


  public dateOptions = {
    locale: { format: 'MM/DD/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    startDate:'09/10/2017'
  };
  @ViewChild('dateExpire') public picker: Daterangepicker;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalItems: number;
  public filter: string = "";
  public keys: string = "";
  public softwares: any[];
  public stores: any[];
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
        // for (var key of this.keys) {
        //   key.dateExpired = moment(key.dateExpired).format('MM/DD/YYYY');
        // }
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

  public selectedDate(value: any) {
    // this.productKeyEntity.dateExpire = moment(value.end._d).format('MM/DD/YYYY');
  }
  public showCalendarDaterangepicker(value: any) {
    console.log(value);
  }

}
