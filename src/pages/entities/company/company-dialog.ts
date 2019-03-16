import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Company } from './company.model';
import { CompanyService } from './company.provider';

@IonicPage()
@Component({
    selector: 'page-company-dialog',
    templateUrl: 'company-dialog.html'
})
export class CompanyDialogPage {

    company: Company;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private companyService: CompanyService) {
        this.company = params.get('item');
        if (this.company && this.company.id) {
            this.companyService.find(this.company.id).subscribe(data => {
                this.company = data;
            });
        } else {
            this.company = new Company();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.company.id : null],
            companyName: [params.get('item') ? this.company.companyName : null,  Validators.required],
            companyPhone: [params.get('item') ? this.company.companyPhone : null,  Validators.required],
            companyEmail: [params.get('item') ? this.company.companyEmail : null,  Validators.required],
            brandingDefaultLanguage: [params.get('item') ? this.company.brandingDefaultLanguage : null, ],
            brandingLogo: [params.get('item') ? this.company.brandingLogo : null,  Validators.required],
            brandingHeaderBackgroundColor: [params.get('item') ? this.company.brandingHeaderBackgroundColor : null, ],
            brandingHeaderTextColor: [params.get('item') ? this.company.brandingHeaderTextColor : null, ],
            brandingHeaderHoverColor: [params.get('item') ? this.company.brandingHeaderHoverColor : null, ],
            brandingSearchBackgroundImg: [params.get('item') ? this.company.brandingSearchBackgroundImg : null, ],
            brandingSearchTextColor: [params.get('item') ? this.company.brandingSearchTextColor : null, ],
            brandingDefaultButtonColor: [params.get('item') ? this.company.brandingDefaultButtonColor : null, ],
            brandingLoginBackgroundImg: [params.get('item') ? this.company.brandingLoginBackgroundImg : null, ],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the company, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

}
