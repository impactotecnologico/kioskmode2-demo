import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {WindowRef} from '../../app/WindowRef';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public exitCounter:number = 1;

  constructor(public navCtrl: NavController, private platform: Platform, private winRef: WindowRef, public alertCtrl: AlertController) {
      platform.registerBackButtonAction(() => {
        if (this.exitCounter==7) {
          this.presentConfirm();  
        } else {
            this.exitCounter++;
        }
      }, 0)
  }

  showApps() {
      this.winRef.nativeWindow.plugins.KPlugin.showApps();
  }

  uninstall() {
      this.winRef.nativeWindow.plugins.KPlugin.uninstall();
  }

   presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.exitCounter = 1;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.exitCounter = 1;
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present();
  }

}
