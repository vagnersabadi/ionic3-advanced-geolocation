import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, ToastController } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  localizacion_ultimo: any;
  localizacion: any[] = [];

  loader: Loading;

  constructor(
    public loc: GeoProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {

  }

  busca_todos_tipos() {
    this.presentLoading();
    this.loc.getcoordenadas();
    this.loc.localizacion.subscribe((_coordenadas) => {
      //this.localizacion_ultimo = _coordenadas;
      if (_coordenadas) {
        if (_coordenadas != this.localizacion_ultimo) {
          this.localizacion.push(_coordenadas);
          this.localizacion_ultimo = _coordenadas;
        }
      }
      this.closeLoading();
    });
  }


  /////////////////////////////////////////////////////////////////////////////////////////
  /** START LOADING */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Buscando coordenadas...',
      enableBackdropDismiss: true
    })
    this.loader.present();
  }

  /**CLOSE LOADING */
  closeLoading() {
    this.loader.dismiss();
  }

  /**TOAST */
  // toast(msgm: string) {
  //   this.toastCtrl.create(
  //     {
  //       message: msgm,
  //       position: 'buttom',
  //       duration: 3000,
  //     }).present();
  // }

}
