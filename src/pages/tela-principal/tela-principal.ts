import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  lat : any;
  lng : any;
  cpf: "";

  constructor(public navCtrl: NavController, public geo: Geolocation, public navParams: NavParams) {
  }
  
  getLoc(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.cpf = this.navParams.get('cpf');
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
