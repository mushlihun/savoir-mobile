import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Headers, Http, Request } from '@angular/http';
import { catchError, map } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  username: string;
  password: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';
const tokenKey = 'id_token';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  private _token: string | null;

  constructor(private _http: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
    const savedToken = sessionStorage.getItem(tokenKey) || localStorage.getItem(tokenKey);

    if (savedToken != null && savedToken != 'undefined') {
      this._token = JSON.parse(savedToken);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */

  // login(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   const data = {
  //     username: context.username,
  //     password: context.password
  //   };
  //   this.setCredentials(data, context.remember);
  //   return of(data);
  // }

  login(context: LoginContext): Observable<any> {
    return this._http
      .post('/authenticate', {
        username: context.username,
        password: context.password
      })
      .pipe(
        map(response => {
          const result = response;
          const data = {
            username: context.username,
            password: context.password
          };
          this.setCredentials(data);
          this.setToken(result);
          console.log('result', result);
          return result;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    this.setToken(this.token);
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  get token(): any | null {
    return this._token;
  }

  authGet(url: string): any {
    const headers = this.initAuthHeaders();
    return this._http.get(url, { headers }).pipe(
      map(response => response),
      catchError(
        (err: HttpErrorResponse): Observable<any> => {
          if (err.status === 401) {
            alert('You are ' + err.statusText + ' to access!');
            this.logout();
          }
          if (err.status === 500) {
            alert(err.statusText);
          } else {
            return throwError(err);
          }
        }
      )
    );
  }

  authPost(url: string, body: any): any {
    const headers = this.initAuthHeaders();
    return this._http.post(url, body, { headers }).pipe(
      map(response => response),
      catchError(
        (err: HttpErrorResponse): Observable<any> => {
          if (err.status === 401) {
            alert('You are ' + err.statusText + ' to access!');
            this.logout();
          }
          if (err.status === 500) {
            alert(err.statusText);
          } else {
            return throwError(err);
          }
        }
      )
    );
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  private setToken(token: any, remember?: boolean) {
    this._token = token || null;

    if (token) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(tokenKey, JSON.stringify(token.id_token));
    } else {
      sessionStorage.removeItem(tokenKey);
      localStorage.removeItem(tokenKey);
    }
  }

  private getLocalToken(): string {
    const savedToken = JSON.parse(sessionStorage.getItem(tokenKey)) || JSON.parse(localStorage.getItem(tokenKey));
    return savedToken;
  }

  private initAuthHeaders(): HttpHeaders {
    const token = this.getLocalToken();
    if (token === null) {
      this.logout();
    }
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    // const headers: HttpHeaders = new HttpHeaders();
    // headers.append('Authorization', 'Bearer ' + token);
    // headers.append('Content-Type', 'application/json');
    return headers;
  }
}
