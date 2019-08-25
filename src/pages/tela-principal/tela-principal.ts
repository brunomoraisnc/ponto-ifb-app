import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

declare var window;
@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {
  cpf: "";
  response: string;
  buttonColor: string = '#000';
  button_status: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private device: Device
    ) {
      this.button_status = false;
    }

    startBackgroundTracking(){
      console.log("rodando startBackground");
      this.cpf = this.navParams.get('cpf');
      // this.button_status? true : false;
      window.app.setCPF(this.cpf)
      window.app.setDeviceUUID(this.device.uuid);
      window.TelaPrincipalPage = this;
      window.app.backgroundGeolocation.start();
      this.buttonColor = this.buttonColor == '#d32f2f'? '#d32f2f' : '#222428';
    }

    stopBackgroundTracking(){
      this.buttonColor = '#222428';
      window.app.backgroundGeolocation.stop();
    }

    getLocations(){
      window.app.getLocations();
    }

    ionViewWillEnter() {
      this.response = '';
      console.log('Device UUID is: ' + this.device.uuid);
    }
    
    alertaAtivarGeoloc() {
      let alert = this.alertCtrl.create({
        title: 'Erro de localização',
        subTitle: 'Erro ao capturar localização. Em [Configuração > Apps] , confirme se a permissão de [LOCAL] está ativada',
        buttons: ['Ok']
      });
      alert.present();
    }

    calcula_distancia(lat1, lon1, lat2, lon2, unit) {
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
      } else {
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
