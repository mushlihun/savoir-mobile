import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AudienceFilterDetailPage } from './audience-filter-detail';
import { AudienceFilterService } from './audience-filter.provider';

@NgModule({
    declarations: [
        AudienceFilterDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AudienceFilterDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AudienceFilterDetailPage
    ],
    providers: [AudienceFilterService]
})
export class AudienceFilterDetailPageModule {
}
