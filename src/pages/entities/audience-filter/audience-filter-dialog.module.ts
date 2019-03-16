import { AudienceService } from '../audience';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AudienceFilterDialogPage } from './audience-filter-dialog';
import { AudienceFilterService } from './audience-filter.provider';

@NgModule({
    declarations: [
        AudienceFilterDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AudienceFilterDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AudienceFilterDialogPage
    ],
    providers: [
        AudienceFilterService,
        AudienceService,
    ]
})
export class AudienceFilterDialogPageModule {
}
