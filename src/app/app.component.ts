import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private backgroundGeolocation: BackgroundGeolocation  
  ) {
    this.initializeApp();
  }

  initializeApp(){

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.arr = [];
      
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true,
        stopOnTerminate: false
      }

      this.backgroundGeolocation.configure(config).then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
            .subscribe((location:BackgroundGeolocationResponse) => {
              console.log(location);
              /*
              let locationstr = localStorage.getItem("location");
              
              if(locationstr == null){
                this.arr.push(location);
              } else {
                let locationarr = JSON.parse(locationstr);
                this.arr = locationstr;
              }
              localStorage.setItem("location", JSON.stringify(this.arr));
              */
        });
      });
      window.app = this;
    });

    
  }
  
}
