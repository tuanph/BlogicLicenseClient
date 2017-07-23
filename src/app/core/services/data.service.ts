import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../common/system.constants';
import { MessageConstants } from '../common/message.constants';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataService {

  private _headers: Headers;
  constructor(private _http: Http, private _router: Router, private _authenService: AuthenService,
    private _notificationService: NotificationService, private _utilityService: UtilityService) {
      this._headers = new Headers();
      this._headers.append("Content-Type","application/json");
  }

  get(url: string) {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoginUser().access_token);
    return this._http.get(SystemConstants.BASE_API + url, { headers: this._headers }).map(this.extractData);
  }
  post(url: string, data?: any) {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoginUser().access_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: this._headers }).map(this.extractData);
  }
  put(url: string, data?: any) {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoginUser().access_token);
    return this._http.put(SystemConstants.BASE_API + url, data, { headers: this._headers }).map(this.extractData);
  }
  delete(url: string, key: string, id: string) {
    this._headers.delete("Authorization");
    this._headers.append("Authorization", "Bearer " + this._authenService.getLoginUser().access_token);
    return this._http.delete(SystemConstants.BASE_API + url + "/?" + key + "=" + id, { headers: this._headers }).map(this.extractData);
  }
  postFile(url: string, data?: any) {

  }
  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this._notificationService.printErrorMessage(errMsg);

      return Observable.throw(errMsg);
    }

  }

}
