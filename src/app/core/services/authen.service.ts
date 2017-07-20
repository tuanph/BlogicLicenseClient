import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import { LoggedInUser } from '../model/loggedin.user';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login(userName: string, passWord: string) {
    let body = "userName=" + encodeURIComponent(userName) +
      "&password=" + encodeURIComponent(passWord) +
      "&grant_type=password";
    let header = new Headers();
    header.append("Content-Type", "application/x-www-form-urlencoded");
    let options: RequestOptions = new RequestOptions({ headers: header });
    return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body, options).map((response: Response) => {
      let user: LoggedInUser = response.json();
      if (user && user.access_token) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
      }
    });;
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    return localStorage.removeItem(SystemConstants.CURRENT_USER) != null;
  }
  getLoginUser(): any {
    let user: LoggedInUser = null;

    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(userData.access_token, userData.username, userData.fullName, userData.email, userData.avatar);
    }
    return user;
  }
}
