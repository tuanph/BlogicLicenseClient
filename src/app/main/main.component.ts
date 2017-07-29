import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser } from '../core/model/loggedin.user';
import { SystemConstants } from '../core/common/system.constants';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoggedInUser;
  constructor(private _authenService: AuthenService) { }
  public baseFolder: string = SystemConstants.BASE_API;
  ngOnInit() {
    this.user = this._authenService.getLoginUser();
  }

  logout() {
    this._authenService.logout();
  }

}
