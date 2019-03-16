import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

const routes = {
  data: (c: DataLearning) => `/api/activities/${c.id}`
};

const categories = {
  data: (c: DataCategories) => `/api/content-categories`
};

const contents = {
  data: (c: DataContents) => `/api/contents`
};

const assignments = {
  data: (c: DataAssignments) => `/api/assignments`
};

const favourite = {
  data: (c: DataFavourite) => `/api/playlists`
};

const populars = {
  data: (c: DataPopulars) => `/api/populars`
};

const recomendeds = {
  data: (c: DataPopulars) => `/api/recomendeds?size=2`
};

export interface DataLearning {
  // The API data continue learning by select ID.
  id: any;
}

export interface DataCategories {
  // The API data show all content categories.
  data: any;
}

export interface DataContents {
  // The API data show all contents.
  data: any;
}

export interface DataAssignments {
  // The API data show data my assignment.
  data: any;
}

export interface DataFavourite {
  // The API data show data my favorites.
  data: any;
}

export interface DataPopulars {
  // The API data show data my populars.
  data: any;
}

export interface DataRecomendeds {
  // The API data show data my recomendeds.
  data: any;
}

@Injectable()
export class HomeService {
  constructor(private auth: AuthenticationService) {}

  getLearning(context: DataLearning): Observable<any> {
    return this.auth.authGet(routes.data(context));
  }

  getCategories(context: DataCategories): Observable<any> {
    return this.auth.authGet(categories.data(context));
  }

  getContents(context: DataContents): Observable<any> {
    return this.auth.authGet(contents.data(context));
  }

  getAssignments(context: DataAssignments): Observable<DataAssignments> {
    return this.auth.authGet(assignments.data(context));
  }

  getFavourite(context: DataFavourite): Observable<DataFavourite> {
    return this.auth.authGet(favourite.data(context));
  }

  getPopulars(context: DataPopulars): Observable<DataFavourite> {
    return this.auth.authGet(populars.data(context));
  }

  getRecomendeds(context: DataRecomendeds): Observable<DataFavourite> {
    return this.auth.authGet(recomendeds.data(context));
  }
}
