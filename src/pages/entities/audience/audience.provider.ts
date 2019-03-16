import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Audience } from './audience.model';

@Injectable()
export class AudienceService {
    private resourceUrl = Api.API_URL + '/audiences';

    constructor(private http: HttpClient) { }

    create(audience: Audience): Observable<Audience> {
        return this.http.post(this.resourceUrl, audience);
    }

    update(audience: Audience): Observable<Audience> {
        return this.http.put(this.resourceUrl, audience);
    }

    find(id: number): Observable<Audience> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
