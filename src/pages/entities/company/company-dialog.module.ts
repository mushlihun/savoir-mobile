import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyDialogPage } from './company-dialog';
import { CompanyService } from './company.provider';

@NgModule({
    declarations: [
        CompanyDialogPage
    ],
    imports: [
        IonicPageModule.forChild(CompanyDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        CompanyDialogPage
    ],
    providers: [
        CompanyService
    ]
})
export class CompanyDialogPageModule {
}
