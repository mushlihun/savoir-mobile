import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AudienceDetailPage } from './audience-detail';
import { AudienceService } from './audience.provider';

@NgModule({
    declarations: [
        AudienceDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AudienceDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AudienceDetailPage
    ],
    providers: [AudienceService]
})
export class AudienceDetailPageModule {
}
