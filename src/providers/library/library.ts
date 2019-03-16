import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

const categories = {
  data: (c: DataCategories) => `/content-categories`
};

const categoriesSearch = {
  data: (c: DataCategories) => `/content-categories/search`
};

/*
const contents = {
  data: (c: DataContents) => `/contents`
};
*/

const contentsByCategoryId = {
  data: (c: DataContents) => `/contents/search`
};

export interface DataCategories {
  // The API data show all content categories.
  data: any;
}

export interface DataContents {
  // The API data show all contents.
  data: any;
}
/*
  Generated class for the LibraryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LibraryProvider {
  constructor(private auth: AuthenticationService) {}

  getCategories(context: DataCategories): Observable<DataCategories> {
    return this.auth.authGet(categories.data(context));
  }

  getCategoriesByParentId(parentId: string, context: DataCategories): Observable<DataCategories> {
    let exampleObj = { parentCategoryId: parentId };

    return this.auth.authPost(categoriesSearch.data(context), exampleObj);
  }

  getContents(categoryId: string, context: DataContents): Observable<DataContents> {
    let exampleObj = { contentCategoryId: categoryId };

    return this.auth.authPost(contentsByCategoryId.data(context), exampleObj);
  }
}
