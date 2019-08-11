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
// import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { ToastController } from 'ionic-angular';

declare var window;
@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {
  locations: any;
  lat: any;
  lng: any;
  cpf: "";
  coords: any;
  // location: any;
  response: string;

  constructor(
    public navCtrl: NavController,
    // private backgroundGeolocation: BackgroundGeolocation,
    // public geo: Geolocation,
    public navParams: NavParams,
    // private http: HTTP,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    private device: Device
    ) {
      this.locations = [];
    }

    startBackgroundTracking(){
      console.log("rodando startBackground");
      this.cpf = this.navParams.get('cpf');
      window.app.setCPF(this.cpf)
      window.app.setDeviceUUID(this.device.uuid);
      window.TelaPrincipalPage = this;
      window.app.backgroundGeolocation.start();
    }

    stopBackgroundTracking(){
      window.app.backgroundGeolocation.stop();
    }

    getLocations(){
      // this.locations = (JSON.parse(localStorage.getItem("location")) == null)?[]:JSON.parse(localStorage.getItem("location"));
      window.app.getLocations();
    }

    ionViewWillEnter() {
      this.response = '';
      console.log('Device UUID is: ' + this.device.uuid);
    }

    async alertaAusencia() {
      const toast = await this.toastController.create({
        message: 'Ausência registrada',
        duration: 2000
      });
      toast.present();
    }

    async alertaPresenca() {
      const toast = await this.toastController.create({
        message: 'Presença registrada',
        duration: 2000
      });
      toast.present();
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
      // let watch = this.geo.watchPosition({enableHighAccuracy: true, timeout: 10000, maximumAge: 10000});

      // define latitude e longitude do evento
      // let event_lat = -15.753827;
      // let event_lng = -47.878808;
      // let unit = "K";
      
      // let dist = this.distance(this.lat, this.lng, data.coords.latitude, data.coords.longitude, unit);

      // let cont = 0;
      /*
      watch.subscribe((data) => {
        if (cont == 0){
          this.lat = data.coords.latitude;
          this.lng = data.coords.longitude;
          cont = 1;
        }
        
        let dist = this.distance(this.lat, this.lng, data.coords.latitude, data.coords.longitude, unit);

        console.log(data.coords.latitude + ' ' + data.coords.longitude);
        console.log('Distância: ' + dist);

        if (dist > 0.001) {
          console.log('Distância alterada acima de 10 m');
          console.log(data.coords.latitude + ' ' + data.coords.longitude);

          this.lat = data.coords.latitude;
          this.lng = data.coords.longitude;

          // calcula distancia
          console.log('Calcula distância do evento');
          this.response = 'Calculando distância';
          let dist_event = this.distance(this.lat, this.lng, event_lat, event_lng, unit);

          // Verifica presenca
          if (dist_event > 0.09287030236638635) {
            this.sendLoc(0);
            // this.response = 'Presença não identificada. Volte para a área do evento!';
            this.alertaAusencia();
          } else {
            this.sendLoc(1);
            // this.response = 'Presença registrada!';
            this.alertaPresenca();
          }
        } else {
          console.log(data.coords.latitude + ' ' + data.coords.longitude);
        }

        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });
      */
    }

  /*getLoc(){
    // descricao: Captura localização
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
}*/
  
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
