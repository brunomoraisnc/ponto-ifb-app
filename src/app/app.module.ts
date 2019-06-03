import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { AlertController } from '@ionic/angular';
// import { HTTP } from '@ionic-native/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TelaPrincipalPage } from '../pages/tela-principal/tela-principal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TelaPrincipalPage
  ],
  imports: [
    BrowserModule,
    // HTTP,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TelaPrincipalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}