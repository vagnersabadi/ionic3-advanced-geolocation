import { Geolocation } from '@ionic-native/geolocation';

import { Injectable } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

declare let AdvancedGeolocation: any;

@Injectable()
export class GeoProvider {
    localizacion = new BehaviorSubject(null);
    data: any;

    constructor(public platform: Platform, public toastCtrl: ToastController, public geolocation: Geolocation) { }

    getcoordenadas() {
        if (this.platform.is('android')) {
            this.platform.ready().then(() => {
                AdvancedGeolocation.start((success) => {
                    try {
                        var jsonObject = JSON.parse(success);
                        switch (jsonObject.provider) {
                            case "gps":
                                this.data = jsonObject.latitude + '/' + jsonObject.longitude + '/GPS';
                                this.localizacion.next(this.data);
                                break;
                            case "network":
                                this.data = jsonObject.latitude + '/' + jsonObject.longitude + '/NET';
                                this.localizacion.next(this.data);
                                break;
                            case "satellite":
                                this.data = jsonObject.latitude + '/' + jsonObject.longitude + '/SATE';
                                this.localizacion.next(this.data);
                                break;
                        }
                    }
                    catch (exc) {
                        console.log("Invalid JSON: " + exc);
                    }
                },
                    function(error) {
                        console.log("ERROR! " + JSON.stringify(error));
                    },
                    {
                      "minTime": 500,           //Intervalo de tempo mínimo entre atualizações (ms)
                      "minDistance": 1,         //Min distância entre atualizações (metros)
                      "noWarn": true,           //Avisos do provedor de localização nativa
                      "providers": "all",       //Devolve localizações GPS, NETWORK e CELL
                      "useCache": false,        //Retorna os locais em cache do GPS e da NETWORK
                      "satelliteData": false,   //Retorno da informação do satélite GPS
                      "buffer": false,          //Buffer location location
                      "bufferSize": 0,          // Max elementos no buffer
                      "signalStrength": false   //Retorna os dados da força do sinal da célula
                    });
            });
        }
        else {
            this.geolocation.getCurrentPosition().then(pos => {
                this.data = pos.coords.latitude + '/' + pos.coords.longitude;
                this.localizacion.next(this.data);
            });
        }
    }

    getcoordenadasGPS() {
        let coor = null;
        AdvancedGeolocation.start((success) => {
            var jsonObject = JSON.parse(success);
            if (jsonObject.provider == "gps") {
                coor = jsonObject.latitude + '/' + jsonObject.longitude + '/GPS';
                alert(coor);
            }
        },
            (error) => {
                console.log("ERROR! " + JSON.stringify(error));
                // alert("ERROR! " + JSON.stringify(error));
            },
            {
                "minTime": 500,           //Intervalo de tempo mínimo entre atualizações (ms)
                "minDistance": 1,         //Min distância entre atualizações (metros)
                "noWarn": true,           //Avisos do provedor de localização nativa
                "providers": "all",       //Devolve localizações GPS, NETWORK e CELL
                "useCache": false,        //Retorna os locais em cache do GPS e da NETWORK
                "satelliteData": false,   //Retorno da informação do satélite GPS
                "buffer": false,          //Buffer location location
                "bufferSize": 0,          // Max elementos no buffer
                "signalStrength": false   //Retorna os dados da força do sinal da célula
            });
        return coor;
    }

}