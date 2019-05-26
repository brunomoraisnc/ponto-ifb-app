import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  lat : any;
  lng : any;

  constructor(public navCtrl: NavController, public geo: Geolocation) {
  }
  
  getLoc(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    // resp.coords.latitude
      // resp.coords.longitude
     }).catch(err => console.log('Error getting location', err));
  }

  // getLoc(){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }
  

}
