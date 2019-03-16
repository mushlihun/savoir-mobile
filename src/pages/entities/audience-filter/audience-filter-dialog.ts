import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AudienceFilter } from './audience-filter.model';
import { AudienceFilterService } from './audience-filter.provider';
import { Audience, AudienceService } from '../audience';

@IonicPage()
@Component({
    selector: 'page-audience-filter-dialog',
    templateUrl: 'audience-filter-dialog.html'
})
export class AudienceFilterDialogPage {

    audienceFilter: AudienceFilter;
    audiences: Audience[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private audienceService: AudienceService,
                private audienceFilterService: AudienceFilterService) {
        this.audienceFilter = params.get('item');
        if (this.audienceFilter && this.audienceFilter.id) {
            this.audienceFilterService.find(this.audienceFilter.id).subscribe(data => {
                this.audienceFilter = data;
            });
        } else {
            this.audienceFilter = new AudienceFilter();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.audienceFilter.id : null],
            filterAttribute: [params.get('item') ? this.audienceFilter.filterAttribute : null,  Validators.required],
            filterOperator: [params.get('item') ? this.audienceFilter.filterOperator : null,  Validators.required],
            filterValue: [params.get('item') ? this.audienceFilter.filterValue : null,  Validators.required],
            audience: [params.get('item') ? this.audienceFilter.audience : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.audienceService.query()
            .subscribe(data => { this.audiences = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the audience-filter, so return it
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

    compareAudience(first: Audience, second: Audience): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAudienceById(index: number, item: Audience) {
        return item.id;
    }
}
