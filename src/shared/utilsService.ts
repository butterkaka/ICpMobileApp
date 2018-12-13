import { LoadingController, NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';


@Injectable()
export class UtilsService {
      private _loader;

      constructor(public loadingControl: LoadingController, public navController: NavController, private ble: BLE ) {
      }

      presentLoading(text: string = "Loading from device") {
            this._loader = this.loadingControl.create({
                  content: text,
                  duration:5000
            });
            this._loader.onDidDismiss(() => {
                  console.log('Dismissed loading');
            });
            this._loader.present();
      }

      hideLoading() {
            this._loader.dismiss();
      }

      back() {
            this.navController.pop();
      }

      sleep(ms:number = 150) {
            return new Promise(resolve => setTimeout(resolve, ms));
      }

      /** 
       * This is used to write value to device.
       * @param {string} deviceID - The device details
       * @param {string} serviceID - The device details
       * @param {string} characteristicID - The device details
       * @param {ArrayBuffer} value - The device details
       */
      async write(deviceID, serviceID, characteristicID, value, delay:number = 150) {
            this.ble.writeWithoutResponse(deviceID, serviceID, characteristicID, value).then(
            result => {
            }).catch(error => {
            console.log("error in write to device:" + JSON.stringify(error));
            });
            if(delay!=0)
                  await this.sleep(delay);
      }

      firstToUpperCase(str){
            return str.substr(0,1).toUpperCase() + str.substr(1);
      }
}