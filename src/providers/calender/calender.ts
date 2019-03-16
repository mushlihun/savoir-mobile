import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

const assignments = {
  data: (c: DataAssignment) => `/assignments/calendar`
};

export interface DataAssignment {
  // The API data show all contents.
  data: any;
}

@Injectable()
export class CalenderProvider {

  constructor(private auth: AuthenticationService) {}

  getAssignments(context: DataAssignment): Observable<any> {
    let now = new Date();
    
    return this.auth.authGet(
      assignments.data(context) //+ '/' + formatDate(now, 'MM', 'en') + '/' + formatDate(now, 'yyyy', 'en')
    );
  }

}
