import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public roles: any[];
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public filter: string = "";

  constructor(private _dataService: DataService, private _notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getRolse();
  }
  public getRolse() {
    let url = "/api/appRole/getlistpaging?page=" + this.pageIndex + "&pageSize=" + this.pageSize + "&filter=" + this.filter;
    this._dataService.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.roles = response.Items;
      });
  }

}
