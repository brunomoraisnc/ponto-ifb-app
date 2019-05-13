import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  data:string = '';
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }
  
  getLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = 'Latitude: ' + resp.coords.latitude + '<br>' + 'Longitude: ' + resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
