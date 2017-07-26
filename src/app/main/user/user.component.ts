import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: any;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalItems: number;
  public filter: string = "";
  public entity: any;
  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    let url = "/api/appUser/getlistpaging?page=" + this.pageIndex + "&pageSize=" + this.pageSize + "&filter=" + this.filter;
    this._dataService.get(url)
      .subscribe((response: any) => {
        this.users = response.Items;
        this.totalItems = response.TotalRows;
      });
  }

  public pageChanged(event: any) {
    this.pageIndex = event.page;
    this.getUsers();
  }
  showAddModal() {

  }
  showEditModal(id: any) {
  }
  deleteUser(id: any) {

  }

}
