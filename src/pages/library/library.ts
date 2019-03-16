import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { finalize } from 'rxjs/operators';
import { LibraryProvider } from '../../providers/library/library';


/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit {

  isLoading: boolean;

  categories: any;
  subCategories: any;
  contents: any;

  public id: any;

  constructor(private CatData: LibraryProvider) {}

  getCategories() {
    this.isLoading = true;
    this.CatData.getCategories({ data: this.categories })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.categories = data;
        console.log('this.categories', this.categories);
      });
  }

  getCategoriesByParentId(parentId: string) {
    this.getContents(parentId);

    this.isLoading = true;
    this.CatData.getCategoriesByParentId(parentId, { data: this.categories })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.subCategories = data;
        console.log('this.subCategories', this.subCategories);
      });
  }

  getContents(categoryId: string) {
    this.isLoading = true;
    this.CatData.getContents(categoryId, { data: this.contents })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.contents = data;
        console.log('contents', this.contents);
      });
  }

  ngOnInit() {
    this.getCategories();
    this.getContents(null);
  }

}
