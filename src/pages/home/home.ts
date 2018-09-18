import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, ToastController } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  localizacion: any;
  gps_coor: any;
  resp_sub: any;
  resp_promis: any;

  private loader: Loading;


  constructor(
    public loc: GeoProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { }

  busca() {
    this.presentLoading();
    this.loc.getcoordenadas();
    this.loc.localizacion.subscribe((_coordenadas) => {
      this.localizacion = _coordenadas;
      this.closeLoading();
    });
  }

  get_gps_sub() {
    this.presentLoading();
    this.loc.getcoordenadasObserble().subscribe((resp) => {
      this.resp_sub = resp;
      this.closeLoading();
    })
  }

  get_gps_promis() {
    this.presentLoading();
    this.loc.getcoordenadasPromisse().then((resp) => {
      this.resp_promis = resp;
      this.closeLoading();
    }).catch((err) => {
      this.toast(err);
      this.closeLoading();
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  /** START LOADING */
  presentLoading(msgm?: string) {
    this.loader = this.loadingCtrl.create({ content: msgm, enableBackdropDismiss: false })
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
