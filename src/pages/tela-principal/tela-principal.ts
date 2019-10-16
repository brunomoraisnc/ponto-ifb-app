import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
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
  showToggle: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private device: Device,
    ) {
      this.button_status = false;
    }
    
    showToggleFun(){
        if(this.showToggle == true){
          this.showToggle = false;
        }else{
          this.showToggle = true;
        }
    }


    startBackgroundTracking(){
      console.log("rodando startBackground");
      this.cpf = this.navParams.get('cpf');
      // this.button_status? true : false;
      window.app.setCPF(this.cpf)
      window.app.setDeviceUUID(this.device.uuid);
      window.TelaPrincipalPage = this;
      window.app.backgroundGeolocation.start();
      this.presentToastGeneral('Monitoramento iniciado');
      // this.buttonColor = this.buttonColor == '#d32f2f'? '#d32f2f' : '#222428';
    }
    
    stopBackgroundTracking(){
      // this.buttonColor = '#222428';
      window.app.backgroundGeolocation.stop();
    }
    
    getLocations(){
      window.app.getLocations();
    }
    
    ionViewWillEnter() {
      this.response = '';
      console.log('Device UUID is: ' + this.device.uuid);
    }
    
    presentToastRequestError() {
      const msg = 'Erro de requisição. Verifique o acesso à internet.';
      const toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top',
      });
      toast.present();
    }
    
    presentToastGeneral(msg) {
      const toast = this.toastCtrl.create({
        message: msg,
        duration: 4000,
        position: 'top',
      });
      toast.present();
    }
    
    stopBackgroundTrackingAlert() {
      let alert = this.alertCtrl.create({
        title: 'Confirmar parada',
        message: 'Você realmente deseja parar o monitoramento?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              console.log('Parada de monitoramento recusada');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.stopBackgroundTracking();
              this.presentToastGeneral('Monitoramento encerrado');
              console.log('Monitoramento cancelado');
              this.showToggleFun();
            }
          }
        ]
      });
      alert.present();
    }
  }
  