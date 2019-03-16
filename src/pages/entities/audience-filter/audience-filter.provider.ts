import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { AudienceFilter } from './audience-filter.model';

@Injectable()
export class AudienceFilterService {
    private resourceUrl = Api.API_URL + '/audience-filters';

    constructor(private http: HttpClient) { }

    create(audienceFilter: AudienceFilter): Observable<AudienceFilter> {
        return this.http.post(this.resourceUrl, audienceFilter);
    }

    update(audienceFilter: AudienceFilter): Observable<AudienceFilter> {
        return this.http.put(this.resourceUrl, audienceFilter);
    }

    find(id: number): Observable<AudienceFilter> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
