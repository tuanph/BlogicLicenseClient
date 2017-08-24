import { Component, OnInit, NgZone } from '@angular/core';
import { LoggedInUser } from '../../core/model/loggedin.user';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { SignalrService } from '../../core/services/signalr.service';
import { DataService } from '../../core/services/data.service';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public user: LoggedInUser;
  public baseFolder: string = SystemConstants.BASE_API;
  public canSendMessage: Boolean;
  public announcements: any[];
  public keys: any[];
  public totalUnregisterKeys: number;
  constructor(private _authenService: AuthenService, private _signalRService: SignalrService,
    private _dataService: DataService,
    private _ngZone: NgZone) {
    // this can subscribe for events  
    this.subscribeToEvents();
    // this can check for conenction exist or not.  
    this.canSendMessage = _signalRService.connectionExists;
  }

  ngOnInit() {
    this.user = this._authenService.getLoginUser();
    this.loadAnnouncements();
    this.loadUnregisterKeys();
  }
  private subscribeToEvents(): void {

    var self = this;
    self.announcements = [];
    self.totalUnregisterKeys = 0;
    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        // announcement.CreatedDate = moment(moment(announcement.CreatedDate).format("MM-DD-YYYY, H:mm:ss "), "MM-DD-YYYY, H:mm:ss ").fromNow();
        // let nowTime = moment();
        announcement.CreatedDate = moment(announcement.CreatedDate).fromNow();
        self.announcements.push(announcement);
      });
    });

    //Handle the number of unregister keys changed
    this._signalRService.totalUnregisterKeyReceived.subscribe((total: number) => {
      this._ngZone.run(() => {
        self.totalUnregisterKeys = total;
      });
    });
  }

  markAsRead(id: number) {
    var body = { announId: id };
    this._dataService.get('/api/Announcement/markAsRead?announId=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.loadAnnouncements();
      }
    });
  }

  private loadAnnouncements() {
    this._dataService.get('/api/Announcement/getTopMyAnnouncement').subscribe((response: any) => {
      this.announcements = [];
      for (let item of response) {
        item.CreatedDate = moment(item.CreatedDate).fromNow();
        this.announcements.push(item);
      }
    });
  }

  private loadUnregisterKeys() {
    this._dataService.get('/api/unregisterKey/getall').subscribe((response: any) => {
      this.keys = [];
      for (let key of response) {
        key.dateConnected = moment(key.dateConnected).fromNow();
        this.keys.push(key);
      }
      this.totalUnregisterKeys = this.keys.length;
    });
  }

  logout() {
    this._authenService.logout();
  }

}