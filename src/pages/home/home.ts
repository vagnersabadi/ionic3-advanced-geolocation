import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, ToastController } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  localizacion_ultimo: any;
  localizacion: any[] = [];

  resp_sub: any[] = [];
  resp_sub_ultimo: any;

  resp_promis: any[] = [];
  resp_promis_ultimo: any;

  loader: Loading;

  constructor(
    public loc: GeoProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
    //Init
    this.busca_todos_tipos();
  }


  busca_todos_tipos() {
    this.presentLoading();
    this.loc.getcoordenadas();
    this.loc.localizacion.subscribe((_coordenadas) => {
      //this.localizacion = _coordenadas;
      if (_coordenadas != this.localizacion_ultimo) {
        this.localizacion.push(_coordenadas);
        this.localizacion_ultimo = _coordenadas;
      }
      this.closeLoading();
    });
  }

  get_gps_sub() {
    this.loc.getcoordenadasObserble().subscribe((resp) => {
      if (resp != this.resp_sub_ultimo) {
        this.resp_sub.push(resp);
        this.resp_sub_ultimo = resp;
      }
    });
  }

  get_gps_promis() {
    this.presentLoading();
    this.loc.getcoordenadasPromisse().then((resp) => {
      if (resp != this.resp_promis_ultimo) {
        this.resp_promis.push(resp);
        this.resp_promis_ultimo = resp;
      }
      this.closeLoading();
    }).catch((err) => {
      this.toast(err);
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
  toast(msgm: string) {
    this.toastCtrl.create(
      {
        message: msgm,
        position: 'buttom',
        duration: 3000,
      }).present();
  }

}
