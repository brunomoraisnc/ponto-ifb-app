import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
// import { Geolocation } from '@ionic-native/geolocation';
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
    BackgroundGeolocation,
    // Geolocation,
    HTTP,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}