import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

const playlist = {
  data: (c: DataPlaylists) => `/api/playlists`
};

export interface DataPlaylists {
  // The API data show all contents.
  data: any;
}

@Injectable()
export class FavouriteService {
  constructor(private auth: AuthenticationService) {}

  getPlaylists(context: DataPlaylists): Observable<any> {
    return this.auth.authGet(playlist.data(context));
  }
}
