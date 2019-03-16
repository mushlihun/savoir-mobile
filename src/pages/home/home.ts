import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { Principal } from '../../providers/auth/principal.service';
import { FirstRunPage } from '../pages';
import { LoginService } from '../../providers/login/login.service';
import { finalize, map } from 'rxjs/operators';
import { HomeService } from '../../providers/home/home.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  isLoading: boolean;

  learning: any = [];
  categories: any;
  categoriesId: any;
  contents: any;
  favourite: any;
  assignments: any;
  recomendeds: any;
  populars: any;

  public id: any;

  icons: Array<String> = [];
  
  account: Account;

  constructor(public navCtrl: NavController,
              private principal: Principal,
              private app: App,
              private HomeData: HomeService,
              private loginService: LoginService) {
  this.icons['listen'] = 'fa-headphones';
  this.icons['learn'] = 'fa-user-graduate';
  this.icons['play'] = 'fa-gamepad';
  this.icons['watch'] = 'fa-tv';
  this.icons['read'] = 'fa-book';
               }

  ngOnInit() {
    // this.getLearning();
    this.getCategories();
    this.getContents();
    this.getFavourite();
    this.getAssignment();
    this.getRecomendeds();
    this.getPopulars();
    this.principal.identity().then((account) => {
      if (account === null) {
        this.app.getRootNavs()[0].setRoot(FirstRunPage);
      } else {
        this.account = account;
      }
    });
  }

  getOrder(id: any) {
    return this.HomeData.getContents(id).pipe(
      map((data: any) => {
        const selectId = data;
        // console.log('selectId', selectId);
        if (selectId) {
          return selectId;
        }
      })
    );
  }

  getLearning() {
    this.isLoading = true;
    this.HomeData.getLearning({ id: this.learning })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.learning = data;
        // console.log('learning', this.learning);
      });
  }

  getCategories() {
    this.isLoading = true;
    this.HomeData.getCategories({ data: this.categories })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.categories = data;
      });
  }

  getContents() {
    this.isLoading = true;
    this.HomeData.getContents({ data: this.contents })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.contents = data;
        // console.log('contents', this.contents);
      });
  }

  getFavourite() {
    this.isLoading = true;
    this.HomeData.getFavourite({ data: this.favourite })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.favourite = data;
        // console.log('favourite', this.favourite);
      });
  }

  getAssignment() {
    this.isLoading = true;
    this.HomeData.getAssignments({ data: this.assignments })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.assignments = data;
        console.log('assignments', this.assignments);
      });
  }

  getRecomendeds() {
    this.isLoading = true;
    this.HomeData.getRecomendeds({ data: this.recomendeds })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.recomendeds = data;
        console.log('recomendeds', this.recomendeds);
      });
  }

  getPopulars() {
    this.isLoading = true;
    this.HomeData.getPopulars({ data: this.populars })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: any) => {
        this.populars = data;
        console.log('populars', this.populars);
      });
  }
  
  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.app.getRootNavs()[0].setRoot(FirstRunPage);
  }
}
