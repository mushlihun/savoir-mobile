import { CompanyService } from '../company';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AudienceDialogPage } from './audience-dialog';
import { AudienceService } from './audience.provider';

@NgModule({
    declarations: [
        AudienceDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AudienceDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AudienceDialogPage
    ],
    providers: [
        AudienceService,
        CompanyService,
    ]
})
export class AudienceDialogPageModule {
}
