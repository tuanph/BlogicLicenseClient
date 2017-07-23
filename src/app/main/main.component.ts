import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthenService } from '../../app/core/services/authen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _authenService: AuthenService) { }

  ngOnInit() {
  }

  logout() {
    this._authenService.logout();
  }

}
