import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Company } from './company.model';

@Injectable()
export class CompanyService {
    private resourceUrl = Api.API_URL + '/companies';

    constructor(private http: HttpClient) { }

    create(company: Company): Observable<Company> {
        return this.http.post(this.resourceUrl, company);
    }

    update(company: Company): Observable<Company> {
        return this.http.put(this.resourceUrl, company);
    }

    find(id: number): Observable<Company> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
