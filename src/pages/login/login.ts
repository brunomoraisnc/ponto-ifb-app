import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TelaPrincipalPage } from '../tela-principal/tela-principal';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  cpf = "";

  constructor(public navCtrl: NavController) {
  }
  goToTelaPrincipal(params){
    console.log(this.cpf);


    // console.log(cpf);

    if (!params) params = {}
    this.navCtrl.push(TelaPrincipalPage, {cpf: this.cpf});
  }
}
