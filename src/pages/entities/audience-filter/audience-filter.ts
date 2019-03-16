import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { AudienceFilter } from './audience-filter.model';
import { AudienceFilterService } from './audience-filter.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-audience-filter',
    templateUrl: 'audience-filter.html'
})
export class AudienceFilterPage {
    audienceFilters: AudienceFilter[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private audienceFilterService: AudienceFilterService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.audienceFilters = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.audienceFilterService.query().subscribe(
            (response) => {
                this.audienceFilters = response;
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

    trackId(index: number, item: AudienceFilter) {
        return item.id;
    }

    open(slidingItem: any, item: AudienceFilter) {
        let modal = this.modalCtrl.create('AudienceFilterDialogPage', {item: item});
        modal.onDidDismiss(audienceFilter => {
            if (audienceFilter) {
                if (audienceFilter.id) {
                    this.audienceFilterService.update(audienceFilter).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'AudienceFilter updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.audienceFilterService.create(audienceFilter).subscribe(data => {
                        this.audienceFilters.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'AudienceFilter added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(audienceFilter) {
        this.audienceFilterService.delete(audienceFilter.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'AudienceFilter deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(audienceFilter: AudienceFilter) {
        this.navCtrl.push('AudienceFilterDetailPage', {id: audienceFilter.id});
    }
}
