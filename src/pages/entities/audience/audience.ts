import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Audience } from './audience.model';
import { AudienceService } from './audience.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-audience',
    templateUrl: 'audience.html'
})
export class AudiencePage {
    audiences: Audience[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private audienceService: AudienceService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.audiences = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.audienceService.query().subscribe(
            (response) => {
                this.audiences = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Audience) {
        return item.id;
    }

    open(slidingItem: any, item: Audience) {
        let modal = this.modalCtrl.create('AudienceDialogPage', {item: item});
        modal.onDidDismiss(audience => {
            if (audience) {
                if (audience.id) {
                    this.audienceService.update(audience).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Audience updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.audienceService.create(audience).subscribe(data => {
                        this.audiences.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Audience added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(audience) {
        this.audienceService.delete(audience.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Audience deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(audience: Audience) {
        this.navCtrl.push('AudienceDetailPage', {id: audience.id});
    }
}
