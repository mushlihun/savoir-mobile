import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Audience } from './audience.model';
import { AudienceService } from './audience.provider';
import { Company, CompanyService } from '../company';

@IonicPage()
@Component({
    selector: 'page-audience-dialog',
    templateUrl: 'audience-dialog.html'
})
export class AudienceDialogPage {

    audience: Audience;
    companies: Company[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private companyService: CompanyService,
                private audienceService: AudienceService) {
        this.audience = params.get('item');
        if (this.audience && this.audience.id) {
            this.audienceService.find(this.audience.id).subscribe(data => {
                this.audience = data;
            });
        } else {
            this.audience = new Audience();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.audience.id : null],
            audienceName: [params.get('item') ? this.audience.audienceName : null,  Validators.required],
            company: [params.get('item') ? this.audience.company : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.companyService.query()
            .subscribe(data => { this.companies = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the audience, so return it
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

    compareCompany(first: Company, second: Company): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }
}
