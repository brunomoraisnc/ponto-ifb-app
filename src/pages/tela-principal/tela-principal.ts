import { Component } from '@angular/core';
import {
  // BackgroundGeolocationOriginal,
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  // BackgroundGeolocationEvents
} from '@ionic-native/background-geolocation';
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  lat : any;
  lng : any;
  cpf: "";
  coords : any;
  location: any;

  constructor(
    public navCtrl: NavController,
    // private backgroundGeolocation: BackgroundGeolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    // public geo: Geolocation,
    public navParams: NavParams,
    private http: HTTP
    ) {}
    
    startBackgroundLoc(){
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };

      this.backgroundGeolocation.configure(config)
      .then(() => {

        this.backgroundGeolocation.on(this.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.location = location;
          this.lat = location.latitude;
          this.lng = location.longitude;
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          // this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });

      }).catch((err) => {
        console.log('erro: ' + err);
      }
      );
      
      // start recording location
      this.backgroundGeolocation.start();
  
    }

  getLoc(){

    /* this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.cpf = this.navParams.get('cpf');

      this.sendLoc();
    }).catch(err => console.log('Error getting location', err)); */
  }
  sendLoc(){
    this.coords = this.lat + " " + this.lng;
    this.http.post('https://api-rest-ppi.herokuapp.com/api-item/',
    { "cpf": this.cpf, "mac":"11", "coords": this.coords, "presenca":"1" }, { }).then(function(response) {
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
