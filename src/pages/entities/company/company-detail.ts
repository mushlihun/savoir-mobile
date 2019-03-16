import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Company } from './company.model';
import { CompanyService } from './company.provider';

@IonicPage({
    segment: 'company-detail/:id',
    defaultHistory: ['EntityPage', 'companyPage']
})
@Component({
    selector: 'page-company-detail',
    templateUrl: 'company-detail.html'
})
export class CompanyDetailPage {
    company: Company;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private companyService: CompanyService, private toastCtrl: ToastController) {
        this.company = new Company();
        this.company.id = params.get('id');
    }

    ionViewDidLoad() {
        this.companyService.find(this.company.id).subscribe(data => this.company = data);
    }

    open(item: Company) {
        let modal = this.modalCtrl.create('CompanyDialogPage', {item: item});
        modal.onDidDismiss(company => {
            if (company) {
                this.companyService.update(company).subscribe(data => {
                    this.company = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Company updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
