import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { AudienceFilter } from './audience-filter.model';
import { AudienceFilterService } from './audience-filter.provider';

@IonicPage({
    segment: 'audience-filter-detail/:id',
    defaultHistory: ['EntityPage', 'audience-filterPage']
})
@Component({
    selector: 'page-audience-filter-detail',
    templateUrl: 'audience-filter-detail.html'
})
export class AudienceFilterDetailPage {
    audienceFilter: AudienceFilter;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private audienceFilterService: AudienceFilterService, private toastCtrl: ToastController) {
        this.audienceFilter = new AudienceFilter();
        this.audienceFilter.id = params.get('id');
    }

    ionViewDidLoad() {
        this.audienceFilterService.find(this.audienceFilter.id).subscribe(data => this.audienceFilter = data);
    }

    open(item: AudienceFilter) {
        let modal = this.modalCtrl.create('AudienceFilterDialogPage', {item: item});
        modal.onDidDismiss(audienceFilter => {
            if (audienceFilter) {
                this.audienceFilterService.update(audienceFilter).subscribe(data => {
                    this.audienceFilter = data;
                    let toast = this.toastCtrl.create(
                        {message: 'AudienceFilter updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
