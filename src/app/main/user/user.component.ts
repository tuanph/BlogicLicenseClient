import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { NgForm } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { UploadService } from '../../core/services/upload.service';
declare var moment: any;

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
  public baseFolder: string = SystemConstants.BASE_API;
  @ViewChild('modalAddEditUser') public modalAddEditUser: ModalDirective;
  @ViewChild('addEditUserForm') public addEditUserForm: NgForm;
  @ViewChild('avatar') avatar;

  public myRoles: string[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService, private _authenService: AuthenService, public _utilityService: UtilityService) {
    if (_authenService.checkAccess('USER') == false) {
      _utilityService.navigateToLogin();
    }
  }

  ngOnInit() {
    this.getRoles();
    this.getUsers();
  }
  getRoles(): any {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.roles = response;
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  getUsers() {
    let url = "/api/appUser/getlistpaging?page=" + this.pageIndex + "&pageSize=" + this.pageSize + "&filter=" + this.filter;
    this._dataService.get(url)
      .subscribe((response: any) => {
        this.users = response.Items;
        console.log(this.users);
        this.totalItems = response.TotalRows;
      });
  }

  public pageChanged(event: any) {
    this.pageIndex = event.page;
    this.getUsers();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEditUser.show();
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        for (let role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
      });
  }
  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEditUser.show();
  }

  public saveChange(valid: boolean) {
    if (valid) {
      this.entity.Roles = this.myRoles;
      let fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=avatar', null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Avatar = imageUrl;
          })
          .then(() => {
            this.saveData();
          });
      }
    }
  }
  public saveData() {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.getUsers();
          this.modalAddEditUser.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.getUsers();
          this.modalAddEditUser.hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }


  deleteUser(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteUserConfirm(id));
  }
  deleteUserConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
      this.getUsers();
    });
  }
  public selectGender(event) {
    this.entity.Gender = event.target.value
  }
  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }

}
