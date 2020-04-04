import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private translateSvc: TranslateService
  ) {}

  async swipableModal(
    page,
    routerOutletNativeEl: HTMLIonRouterOutletElement,
    componentProps: any,
    cssClass: string
  ): Promise<HTMLIonModalElement> {
    return await this.modalController.create({
      component: page,
      swipeToClose: true,
      mode: 'ios',
      presentingElement: routerOutletNativeEl
        ? routerOutletNativeEl
        : await this.modalController.getTop(),
      componentProps: componentProps,
      cssClass: cssClass,
    });
  }

  presentToast(
    messageInfo: string,
    durationInfo: number,
    position: any,
    closeText: string
  ) {
    if (durationInfo === 0) {
      durationInfo = 1000;
    }
    this.toastCtrl
      .create({
        message: this.translateSvc.instant(messageInfo),
        duration: durationInfo,
        position: position,
        buttons: [closeText],
        cssClass: 'black-toast',
      })
      .then((t) => t.present());
  }
}
