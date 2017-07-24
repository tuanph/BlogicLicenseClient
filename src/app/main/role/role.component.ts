import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public roles: any[];
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalItems: number;
  public filter: string = "";
  public entity: any;

  @ViewChild('addOrEditModal') public addOrEditModal: ModalDirective;
  @ViewChild("addOrEditForm") public addOrEditForm: NgForm;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getRoles();
  }
  public getRoles() {
    let url = "/api/appRole/getlistpaging?page=" + this.pageIndex + "&pageSize=" + this.pageSize + "&filter=" + this.filter;
    this._dataService.get(url)
      .subscribe((response: any) => {
        // console.log(response);
        this.roles = response.Items;
        this.totalItems = response.TotalRows;
      });
  }

  public pageChanged(event: any) {
    this.pageIndex = event.page;
    this.getRoles();
  }

  public showAddModal() {
    this.entity = {};
    this.addOrEditModal.show();
  }
  public showEditModal(id: any) {
    this.getRoleById(id);
    this.addOrEditModal.show();
  }

  public getRoleById(id: any) {
    let url = "/api/appRole/detail/" + id;
    this._dataService.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.entity = response;
      });
  }
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post("/api/appRole/add", JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.getRoles();
            this.addOrEditModal.hide();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
           
          }, (error) => {
            this._dataService.handleError(error);
          });
      } else {
        this._dataService.put("/api/appRole/update", JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.getRoles();
            this.addOrEditModal.hide();
            this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          }, (error) => {
            this._dataService.handleError(error);
          });
      }
         this.addOrEditForm.resetForm();
    }
  }

}
