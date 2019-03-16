import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company';
import { CompanyService } from './company.provider';

@NgModule({
    declarations: [
        CompanyPage
    ],
    imports: [
        IonicPageModule.forChild(CompanyPage),
        TranslateModule.forChild()
    ],
    exports: [
        CompanyPage
    ],
    providers: [CompanyService]
})
export class CompanyPageModule {
}
