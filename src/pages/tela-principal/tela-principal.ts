import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { HTTP } from '@ionic-native/http';
// import { HTTP } from '@ionic-native/http/ngx'


@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  lat : any;
  lng : any;
  cpf: "";

  constructor(public navCtrl: NavController, public geo: Geolocation, public navParams: NavParams, private http: HTTP) {
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
  sendLoc(){
    this.http.post('https://api-rest-ppi.herokuapp.com/api-item/',
    { "cpf": "04719935141", "mac":"11", "coords": "123456", "presenca":"1" }, { }).then(function(response) {
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
      // prints 403
      console.log(response.status);

      //prints Permission denied
      console.log(response.error);
    });
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
