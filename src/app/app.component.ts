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
              // Envia localizacao via API
              this.sendLoc(
                presence,
                this.getCPF(),
                this.getDeviceUUID(),
                location.latitude,
                location.longitude
              );
        });
      });
      window.app = this;
    });
  }

  sendLoc(presenca: number, cpf: string, mac: string, lat: number, lng: number){
   
    /* DEF: Envia locatização para a API
     * PARAMS:
     *    presenca: presenca do aluno [0, 1]
    */

    let coords = lat + " " + lng;
    this.http.post('https://api-rest-ppi.herokuapp.com/api-item/',
    {
      "cpf": cpf,
      "mac": mac,
      "coords": coords,
      "presenca": presenca
    }, { }).then(function(response) {
      // prints 200
      console.log(response.status);
      try {
        response.data = JSON.parse(response.data);
        // prints test
        console.log(response.data.message);
      } catch(e) {
        console.error('JSON parsing error');
      }
    }, function(response) {
      console.log('Erro na requisição à API')
      // prints 403
      console.log(response.status);

      //prints Permission denied
      console.log(response.error);
      window.TelaPrincipalPage.presentToastRequestError();
    });
  }

  getLocations(){
    console.log(this.backgroundGeolocation.getLocations());
  }
}
