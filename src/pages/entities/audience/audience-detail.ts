import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Audience } from './audience.model';
import { AudienceService } from './audience.provider';

@IonicPage({
    segment: 'audience-detail/:id',
    defaultHistory: ['EntityPage', 'audiencePage']
})
@Component({
    selector: 'page-audience-detail',
    templateUrl: 'audience-detail.html'
})
export class AudienceDetailPage {
    audience: Audience;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private audienceService: AudienceService, private toastCtrl: ToastController) {
        this.audience = new Audience();
        this.audience.id = params.get('id');
    }

    ionViewDidLoad() {
        this.audienceService.find(this.audience.id).subscribe(data => this.audience = data);
    }

    open(item: Audience) {
        let modal = this.modalCtrl.create('AudienceDialogPage', {item: item});
        modal.onDidDismiss(audience => {
            if (audience) {
                this.audienceService.update(audience).subscribe(data => {
                    this.audience = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Audience updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
