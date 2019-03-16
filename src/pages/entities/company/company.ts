import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Company } from './company.model';
import { CompanyService } from './company.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-company',
    templateUrl: 'company.html'
})
export class CompanyPage {
    companies: Company[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private companyService: CompanyService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.companies = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.companyService.query().subscribe(
            (response) => {
                this.companies = response;
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

    trackId(index: number, item: Company) {
        return item.id;
    }

    open(slidingItem: any, item: Company) {
        let modal = this.modalCtrl.create('CompanyDialogPage', {item: item});
        modal.onDidDismiss(company => {
            if (company) {
                if (company.id) {
                    this.companyService.update(company).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Company updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.companyService.create(company).subscribe(data => {
                        this.companies.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Company added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(company) {
        this.companyService.delete(company.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Company deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(company: Company) {
        this.navCtrl.push('CompanyDetailPage', {id: company.id});
    }
}
