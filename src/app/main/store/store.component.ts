import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';
declare var moment: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public stores: any[];
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalItems: number;
  public filter: string = "";
  public entity: any = {};
  public productKeyEntity: any = {};
  public softwares: any[];

  public dateOptions: any = {
    locale: { format: 'MM/DD/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: true
  };
  public modalConfigs: ModalOptions = {
    animated: true,
    keyboard: false,
    backdrop: false,
    ignoreBackdropClick: true
  };

  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('manageProductKeyModal') public manageProductKeyModal: ModalDirective;
  @ViewChild("addEditForm") public addEditForm: NgForm;
  @ViewChild("productKeyForm") public productKeyForm: NgForm;
  @ViewChild("manageProductKeyModalForm") public manageProductKeyModalForm: NgForm;
  constructor(private dataService: DataService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getStores();
    this.getSoftwares();
  }

  getSoftwares() {

    let url = "/api/software/getall";
    this.dataService.get(url)
      .subscribe((response: any) => {
        this.softwares = response;
      });
  }

  public getStores() {
    let url = "/api/store/getlistpaging?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "&filter=" + this.filter;
    this.dataService.get(url)
      .subscribe((response: any) => {
        this.stores = response.items;
        this.totalItems = response.totalRows;
      });
  }

  public pageChanged(event: any) {
    this.pageIndex = event.page;
    this.getStores();
  }

  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
  }

  public showEditModal(store: any) {
    this.entity = store;
    this.addEditModal.show();
  }


  public showManageProductKeyModal(store: any) {
    this.entity = store;
    if (this.entity.productKeys.length == 0) {
      this.entity.productKeys = new Array();
    }

    this.productKeyEntity.dateExpire = moment(new Date()).add(1, 'M').format('MM/DD/YYYY');
    this.productKeyEntity.softwareID = 1;
    this.manageProductKeyModal.show();
  }

  public addMoreProductKey(form: NgForm) {
    if (form.valid) {
      //let copy = JSON.parse(JSON.stringify(this.productKeyEntity));
      let copy = Object.assign({}, this.productKeyEntity);
      //check duplicate productId on local. Need check more on Sever
      for (let i = 0; i < this.entity.productKeys.length; i++) {
        if (this.entity.productKeys[i].key === copy.key) {
          this.notificationService.printErrorMessage(copy.key + " is duplicated!");
          return;
        }
      }
      copy.softwareID = +copy.softwareID;//parse to Number
      copy.storeID = this.entity.id;
      this.entity.productKeys.push(copy);
    }
  }

  public editProductKey(form: NgForm) {
    if (form.valid) {
      this.dataService.put("/api/store/editProductKey", JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.getStores();
          this.manageProductKeyModal.hide();
          this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          form.resetForm();
          this.productKeyForm.resetForm();
        }, (error) => {
          this.dataService.handleError(error);
        });
    }
  }

  public removeProductKey(productKey: any) {
    this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.removeProductKeyConfirm(productKey));
  }
  public saveChanges(form: NgForm) {
    if (form.valid) {
      if (this.entity.id == undefined) {
        this.dataService.post("/api/store/add", JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.getStores();
            this.addEditModal.hide();
            this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
            form.resetForm();
            this.productKeyForm.resetForm();
          }, (error) => {
            console.log(error);
            this.dataService.handleError(error);
          });
      } else {
        this.dataService.put("/api/store/editBasic", JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.getStores();
            this.addEditModal.hide();
            this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
            form.resetForm();
            this.productKeyForm.resetForm();
          }, (error) => {
            this.dataService.handleError(error);
          });
      }
    }
  }

  public removeProductKeyConfirm(productKey: any) {
    let index: number = this.entity.productKeys.indexOf(productKey);
    if (index != -1) {
      this.entity.productKeys.splice(index, 1);
    }
  }

  public deleteStore(storeID: number) {
    this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.removeStoreConfirm(storeID));
  }

  public removeStoreConfirm(id: number) {
    this.dataService.delete("/api/store/delete", "id", id.toString()).subscribe(() => {
      this.notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
      this.getStores();
    });
  }
  public selectedDate(value: any) {
    this.productKeyEntity.dateExpire = moment(value.end._d).format('MM/DD/YYYY');
  }

  public closeAddEditModal() {
    this.getStores();
    this.addEditForm.resetForm();
    this.addEditModal.hide();
  }

  public closemanageProductKeyModal() {
    this.productKeyForm.resetForm();
    this.manageProductKeyModalForm.resetForm();
    this.manageProductKeyModal.hide();
  }
}
