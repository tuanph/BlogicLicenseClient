import { Component, OnInit,ElementRef } from '@angular/core';
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
  constructor(private _authenService: AuthenService,private elementRef: ElementRef) { }
  public baseFolder: string = SystemConstants.BASE_API;
  ngOnInit() {
    this.user = this._authenService.getLoginUser();

     var existsScript = document.getElementById("customJS");
    if (existsScript != null) {
      this.elementRef.nativeElement.removeChild(existsScript);
    }
    else {
      var cusScript = document.createElement("script");
      cusScript.type = "text/javascript";
      cusScript.src = "../assets/js/custom.js";
      cusScript.id = "customJS";
      this.elementRef.nativeElement.appendChild(cusScript);
    }
  }
  logout(){
    this._authenService.logout();
  }


}
