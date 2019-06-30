import { Component } from '@angular/core';
/*import {
  // BackgroundGeolocationOriginal,
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  // BackgroundGeolocationEvents
} from '@ionic-native/background-geolocation';*/
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  lat: any;
  lng: any;
  cpf: "";
  coords: any;
  // location: any;
  response: string;

  constructor(
    public navCtrl: NavController,
    // private backgroundGeolocation: BackgroundGeolocation,
    public geo: Geolocation,
    public navParams: NavParams,
    private http: HTTP,
    private alertCtrl: AlertController,
    private device: Device
    ) {}

    ionViewWillEnter() {
      this.response = '';
      console.log('Device UUID is: ' + this.device.uuid);
    }

    alertaAusencia() {
      let alert = this.alertCtrl.create({
        title: 'Ausência registrada',
        subTitle: 'Vá para a área do evento e não se esqueca de confirmar sua presença',
        buttons: ['Entendido']
      });
      alert.present();
    }

    alertaPresenca() {
      let alert = this.alertCtrl.create({
        title: 'Presença registrada',
        subTitle: 'Promete aproveitar bastante o evento?',
        buttons: ['Prometo']
      });
      alert.present();
    }
    
    alertaAtivarGeoloc() {
      let alert = this.alertCtrl.create({
        title: 'Erro de localização',
        subTitle: 'Erro ao capturar localização. Em [Configuração > Apps] , confirme se a permissão de [LOCAL] está ativada',
        buttons: ['Ok']
      });
      alert.present();
    }

    startBackgroundLoc(){
      console.log('inicializa startBackgroundLoc');

      let watch = this.geo.watchPosition({enableHighAccuracy: true, timeout: 5000});

      watch.subscribe((data) => {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;

        console.log(data.coords.latitude);
        console.log(data.coords.longitude);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      });
    }

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
        // this.response = 'Presença não identificada. Volte para a área do evento!';
        this.alertaAusencia();
      } else {
        this.sendLoc(1);
        // this.response = 'Presença registrada!';
        this.alertaPresenca();
      }
      console.log('Distância: ' + dist);
    }).catch((err) => {
      console.log('Erro ao tentar capturar geolocalização: ', err);
      this.alertaAtivarGeoloc();
    });
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
      console.log('Erro na requisição à API')
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
          unit: unidade de medida
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
