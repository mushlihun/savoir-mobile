import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalenderProvider } from '../../providers/calender/calender';
import { finalize } from 'rxjs/operators';
/**
 * Generated class for the CalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html',
})
export class CalenderPage implements OnInit {
  isLoading: boolean;

  assignments: any[];
  events: any[];

  dateShow: { year: number; month: number };

  constructor(private service: CalenderProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  getAssignments() {
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

        //console.log('assignments', this.assignments);

        this.assignments.forEach(assignment => {
          let startTime = new Date(assignment.startTime);
          let endTime = new Date(assignment.endTime);

          let diffDays = Math.round(Math.abs((startTime.getTime() - endTime.getTime()) / (24 * 60 * 60 * 1000)));

          for (var i = startTime; i <= endTime; i.setDate(i.getDate() + 1)) {
            //console.log('new date ', i);

            this.events.push({
              year: i.getFullYear(),
              month: i.getMonth() + 1,
              day: i.getDate()
            });
          }
        });
      });
  }

  myEvent(date: any) {
    const event = this.events.find(
      dday => dday.year === date.year && dday.month === date.month && dday.day === date.day
    );
    return [event ? 'blue' : ''];
  }

  isWeekend(date: any) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  ngOnInit() {
    this.getAssignments();
    this.select(Date);
    this.events = [];
  }

  select(date: any) {
    console.log('get date', date);
  }

}
