import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  localizacion: any[] = [];
  gps_coor: any;


  constructor(public loc: GeoProvider) {
    this.busca() 
  }


  busca() {
    this.loc.getcoordenadas();
    this.loc.localizacion.subscribe((_coordenadas) => {
      this.localizacion.push(_coordenadas);
    });
  }

  get_gps() {
    this.gps_coor = this.loc.getcoordenadasGPS();
  }
}
