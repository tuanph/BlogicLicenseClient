import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser } from '../core/model/loggedin.user';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoggedInUser;
  constructor(private _authenService: AuthenService) { }

  ngOnInit() {
    this.user = this._authenService.getLoginUser();
    console.log(this.user);
  }

  logout() {
    this._authenService.logout();
  }

}
