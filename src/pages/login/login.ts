import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TelaPrincipalPage } from '../tela-principal/tela-principal';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToTelaPrincipal(params){
    if (!params) params = {};
    this.navCtrl.push(TelaPrincipalPage);
  }
}
