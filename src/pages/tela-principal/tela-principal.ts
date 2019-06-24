import { Component } from '@angular/core';
/*import {
  // BackgroundGeolocationOriginal,
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  // BackgroundGeolocationEvents
} from '@ionic-native/background-geolocation';*/
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  lat: any;
  lng: any;
  cpf: "";
  coords: any;
  location: any;
  response: string;

  constructor(
    public navCtrl: NavController,
    // private backgroundGeolocation: BackgroundGeolocation,
    public geo: Geolocation,
    public navParams: NavParams,
    private http: HTTP
    ) {}
    
    /*startBackgroundLoc(){
      console.log('inicializa startBackgroundLoc');

      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
      
      this.backgroundGeolocation.configure(config)
      .then(() => {
          this.backgroundGeolocation.on('location').subscribe((location: BackgroundGeolocationResponse) => {
            this.location = location;
            console.log(this.location);
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          // this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
      });
        
      // start recording location
      this.backgroundGeolocation.start();
    }*/

  getLoc(){
    /* descricao: Captura localização */
    this.geo.getCurrentPosition().then( (pos) => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.cpf = this.navParams.get('cpf');

      // define latitude e longitude do evento
      let event_lat = -15.753827;
      let event_lng = -47.878808;
      let unit = "K";

      // calcula distancia
      this.response = 'Calculando distância';
      let dist = this.distance(this.lat, this.lng, event_lat, event_lng, unit);

      // Verifica presenca
      if (dist > 0.09287030236638635) {
        this.sendLoc(0);
        this.response = 'Presença não identificada. Volte para a área do evento!';
      } else {
        this.sendLoc(1);
        this.response = 'Presença registrada!';
      }
      console.log(dist);
    }).catch((err) => console.log('Error getting location', err));
  }

  sendLoc(presenca: number){
   
    /* DEF: Envia locatização para a API
     * PARAMS:
     *    presenca: presenca do aluno [0, 1]
    */

    this.coords = this.lat + " " + this.lng;
    this.http.post('https://api-rest-ppi.herokuapp.com/api-item/',
    { "cpf": this.cpf, "mac":"11", "coords": this.coords, "presenca": presenca }, { }).then(function(response) {
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
  
  distance(lat1, lon1, lat2, lon2, unit) {
    /*
       DEF: Calcula distância entre coordenadas
       PARAMS:
          lat1: latitude ponto 1
          lon1: longitude ponto 1
          lat2: latitude ponto 2
          lon2: longitude ponto 2        
    */
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }
}
