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
  cpf: string;
  deviceUUID: string;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private backgroundGeolocation: BackgroundGeolocation  
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

      const event_lat = -15.753827;
      const event_lng = -47.878808;
      const unit = "K";

      let presence = 0;
      
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true,
        stopOnTerminate: false
      }
      // let locations = [];

      this.backgroundGeolocation.configure(config).then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
            .subscribe((location:BackgroundGeolocationResponse) => {
              console.log(location);

              // locations.push(location.latitude);
              // console.log(locations);
              // window.TelaPrincipalPage.startBackgroundLoc();

              // let dist = window.TelaPrincipalPage.distance(event_lat, event_lng, location.latitude, location.longitude, unit);
              
              // Verifica presenca
              // presence = dist > 0.09287030236638635 ? 0:1;

              // window.TelaPrincipalPage.sendLoc(
              //   presence,
              //   this.getCPF(),
              //   this.getDeviceUUID(),
              //   location.latitude,
              //   location.longitude
              // );
              
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
