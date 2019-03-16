import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { finalize } from 'rxjs/operators';
import { ContinueLearningProvider } from '../../../providers/continue-learning/continue-learning';
/**
 * Generated class for the ContinueLearningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-continue-learning',
  templateUrl: 'continue-learning.html',
})
export class ContinueLearningPage implements OnInit {
  
  isLoading: boolean;

  continues: any;

  icons: Array<String> = [];
  constructor(private service: ContinueLearningProvider, public navParams: NavParams) {
    this.icons['listen'] = 'fa-headphones';
    this.icons['learn'] = 'fa-user-graduate';
    this.icons['play'] = 'fa-gamepad';
    this.icons['watch'] = 'fa-tv';
    this.icons['read'] = 'fa-book';
  }

  getContinues() {
    this.isLoading = true;
    this.service
      .getContinues({ data: this.continues })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.continues = data;
        console.log('continues', this.continues);
      });
  }

  ngOnInit() {
    this.getContinues();
  }

}
