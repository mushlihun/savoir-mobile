import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StatusProvider } from '../../../providers/status/status';
import { finalize } from 'rxjs/operators';
/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage implements OnInit {
  isLoading: boolean;

  assignments: any;

  icons: Array<String> = [];

  expand: boolean = true;
  constructor(private service: StatusProvider) {
    this.icons['listen'] = 'fa-headphones';
    this.icons['learn'] = 'fa-user-graduate';
    this.icons['play'] = 'fa-gamepad';
    this.icons['watch'] = 'fa-tv';
    this.icons['read'] = 'fa-book';
  }

  getAssignment() {
    this.isLoading = true;
    this.service
      .getAssignments({ data: this.assignments })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.assignments = data;
        console.log('assignments', this.assignments);
      });
  }

  ngOnInit() {
    this.getAssignment();
  }

  toggleExpand() {
    this.expand = !this.expand;
  }

}
