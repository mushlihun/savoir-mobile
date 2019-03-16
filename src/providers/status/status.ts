import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

const assignments = {
  data: (c: DataAssignments) => `/assignments`
};

export interface DataAssignments {
  // The API data show data my assignment.
  data: any;
}

@Injectable()
export class StatusProvider {

  constructor(private auth: AuthenticationService) {}

  getAssignments(context: DataAssignments): Observable<DataAssignments> {
    return this.auth.authGet(assignments.data(context));
  }

}
