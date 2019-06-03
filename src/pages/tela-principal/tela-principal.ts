import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { HTTP } from '@ionic-native/http';


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

    // this.http.get('https://jsonplaceholder.typicode.com/todos/1', {}, {})
    //   .then(data => {
    //     console.log('teste')
    //     // console.log(data.status);
    //     // console.log(data.data); // data received by server
    //     // console.log(data.headers);

    //   }).catch(err1 => console.log('Error getting location', err1));
  // }
  // getLoc(){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }
  

}
