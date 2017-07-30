import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../../core/model/loggedin.user';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  public baseFolder: string = SystemConstants.BASE_API;
  public user: LoggedInUser;
  constructor(private _authenService: AuthenService) { }
  ngOnInit() {
    this.user = this._authenService.getLoginUser();
  }
}
