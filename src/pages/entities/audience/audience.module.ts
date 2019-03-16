import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AudiencePage } from './audience';
import { AudienceService } from './audience.provider';

@NgModule({
    declarations: [
        AudiencePage
    ],
    imports: [
        IonicPageModule.forChild(AudiencePage),
        TranslateModule.forChild()
    ],
    exports: [
        AudiencePage
    ],
    providers: [AudienceService]
})
export class AudiencePageModule {
}
