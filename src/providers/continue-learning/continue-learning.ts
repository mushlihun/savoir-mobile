import { AuthenticationService } from '../auth/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const continues = {
  data: (c: DataContinues) => `/employee-content-accesses/continues`
};

export interface DataContinues {
  // The API data show all contents.
  data: any;
}
/*
  Generated class for the ContinueLearningProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContinueLearningProvider {

  constructor(private auth: AuthenticationService) {
    console.log('Hello ContinueLearningProvider Provider');
  }

  getContinues(context: DataContinues): Observable<any> {
    return this.auth.authGet(continues.data(context));
  }

}
