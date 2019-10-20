import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from '@ionic-native/background-geolocation';


import { LoginPage } from '../pages/login/login';


declare var window;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  arr: any;
  cpf: string;
  deviceUUID: string;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private backgroundGeolocation: BackgroundGeolocation,
    private http: HTTP
  ) {
    this.initializeApp();
  }

  setCPF(cpf){
    this.cpf = cpf;
  }

  getCPF(){
    return this.cpf;
  }

  setDeviceUUID(deviceUUID){
    this.deviceUUID = deviceUUID;
  }

  getDeviceUUID(){
    return this.deviceUUID;
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // TODO: remove it in the next api update
      let presence = 0;
      
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 1,
        distanceFilter: 1,
        debug: false,
        stopOnTerminate: false,
        interval: 10000
      }
      // let locations = [];

      this.backgroundGeolocation.configure(config).then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
            .subscribe((location:BackgroundGeolocationResponse) => {
              console.log(location);
        });
      });
      window.app = this;
    });
  }

  getLocations(){
    console.log(this.backgroundGeolocation.getLocations());
  }
}
