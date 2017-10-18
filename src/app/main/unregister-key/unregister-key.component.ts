import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { BusyModule } from 'angular2-busy';
import { Subscription } from 'rxjs';

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
    showDropdowns: true,
    autoUpdateInput: true
  };
  @ViewChild('dateExpire') public picker: Daterangepicker;
  busy: Subscription;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalItems: number;
  public filter: string = "";
  public keys: any[];
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
    this.busy = this.dataService.get(url)
      .subscribe((response: any) => {
        this.keys = response.items;
        this.totalItems = response.totalRows;
      });
  }

  public getSoftwares() {
    let url = "/api/software/getall";
    this.busy = this.dataService.get(url)
      .subscribe((response: any) => {
        this.softwares = response;
      });
  }
  public getStores() {
    let url = "/api/store/gellAllWithOutProductKey";
    this.busy = this.dataService.get(url)
      .subscribe((response: any) => {
        this.stores = response;
      });
  }

  registerProduct(pk: any) {
    let productKeyViewModel: any = {};
    productKeyViewModel.dateExpried = pk.dateExpried;//moment( pk.dateExpried).format('MM/DD/YYYY')
    productKeyViewModel.key = pk.key;
    productKeyViewModel.storeID = pk.storeID;
    productKeyViewModel.softwareID = pk.softwareID;
    productKeyViewModel.isNeverExpried = pk.isNeverExpried;
    this.busy = this.dataService.post('/api/unregisterKey/registerkey', JSON.stringify(productKeyViewModel)).subscribe(
      (response: any) => {
        this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        this.getUnregisterKeys();
      },
      (error: any) => {
        this.dataService.handleError(error);
      }
    );

  }
  public pageChanged(event: any) {
    this.pageIndex = event.page;
    this.getUnregisterKeys();
  }

  public selectedDate(value: any, key: any) {
    key.dateExpried = moment(value.end._d).format('MM/DD/YYYY');
  }
}
