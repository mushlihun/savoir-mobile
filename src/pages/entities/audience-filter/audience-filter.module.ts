import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AudienceFilterPage } from './audience-filter';
import { AudienceFilterService } from './audience-filter.provider';

@NgModule({
    declarations: [
        AudienceFilterPage
    ],
    imports: [
        IonicPageModule.forChild(AudienceFilterPage),
        TranslateModule.forChild()
    ],
    exports: [
        AudienceFilterPage
    ],
    providers: [AudienceFilterService]
})
export class AudienceFilterPageModule {
}
