import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyDetailPage } from './company-detail';
import { CompanyService } from './company.provider';

@NgModule({
    declarations: [
        CompanyDetailPage
    ],
    imports: [
        IonicPageModule.forChild(CompanyDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        CompanyDetailPage
    ],
    providers: [CompanyService]
})
export class CompanyDetailPageModule {
}
