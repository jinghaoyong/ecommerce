import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../../core/services/firebase.service';
import { UserData } from '../../../core/interfaces/@type';
import { CommonModule } from '@angular/common';
import { TitlestringService } from '../../../core/services/titleString/titlestring.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Tooltip, Popover } from 'bootstrap';
import { NavbarService } from '../../../core/services/navbar/navbar.service';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';
import { QuerySearchService } from '../../services/querySearch/query-search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly prefixTranslate = 'NAVBAR.';
  private subscription = new Subscription();
  isStickyNav = false; // Default is non-sticky

  currentUser?: any;
  fallbackImage?: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'

  titleString?: any[];

  // for search bar and cateogires 
  categories: any[] = [];

  searchQuery: string = "";

  cartItemsCount?: any;
  unsubscribeCart?: () => void;

  constructor(
    private firebaseServ: FirebaseService,
    private titleStringServ: TitlestringService,
    private router: Router,
    private translate: TranslateService,
    private navbarServ: NavbarService,
    private shoppingcartServ: ShoppingCartService,
    private route: ActivatedRoute,
    private querySearchServ: QuerySearchService
  ) {
    this.currentUser = this.firebaseServ.currentUserValue;
    this.translate.setDefaultLang('en'); // Set default language
    this.translate.use('en'); // Use English initially
    this.getTopHashtags();
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("event.url", event.url)

        // Define pages where navbar should be sticky
        // const stickyPages = ['/', '/shop']; // Add paths where navbar should be sticky
        const stickyPages = ['/']; // Add paths where navbar should be sticky
        this.isStickyNav = stickyPages.includes(event.url);
        console.log("stickyPages.includes(event.url)", stickyPages.includes(event.url))

        this.route.queryParams.subscribe(params => {
          const hashtagQ = params['hashtag'];
          if (hashtagQ) {
            console.log("nav top bar hashtagQ", hashtagQ)
          } else {
            console.log("nav top bar hashtagQ not found")
            this.searchQuery = "";
          }
        });
      }
    });

    console.log("navbar currentUser", this.firebaseServ.currentUserValue)
    this.currentUser = this.firebaseServ.currentUserValue;
    console.log("currentUser", this.currentUser)

    if (this.currentUser) {
      this.loadTitleString();
      this.loadCartItemsCount();
    }

    this.subscription = this.querySearchServ.clearQuery$.subscribe(() => {
      // Handle the clear action here
      this.searchQuery = '';
    });
  }

  ngAfterViewInit(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => new Popover(popoverTriggerEl));
    console.log("ngAfterViewInit()")
  }

  async loadTitleString() {
    this.titleString = await this.titleStringServ.getTitleString();
    console.log("loadTitleString", this.titleString)
  }

  async loadCartItemsCount() {
    console.log("this.currentUser.userId", this.currentUser.userId)
    this.unsubscribeCart = this.shoppingcartServ.getCartItemCountRealtime(this.currentUser.userId, (count) => {
      this.cartItemsCount = count;
    });
    console.log("cartItemsCount", this.cartItemsCount)
  }


  loggedIn(): boolean {
    // Implement your logic to check if user is logged in
    return true; // Replace with your actual logic
  }
  async signInWithGoogle() {
    const userData = await this.firebaseServ.googleLoginUser();
    console.log("userDAta from firebaseServ", userData)
    this.currentUser = this.firebaseServ.currentUserValue;
    console.log("currentUser", this.currentUser)
  }

  async getTopHashtags() {
    this.categories = await this.navbarServ.getTopHashtags();
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement.src && this.fallbackImage) imgElement.src = this.fallbackImage;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  onLogout(): void {
    // this.authServ.logout();
    // this.router.navigateByUrl('/')
    this.firebaseServ.logout();
    this.currentUser = this.firebaseServ.currentUserValue;
  }

  onSearch() {
    console.log("searchQuery", this.searchQuery)
    this.router.navigate(['/searchresults'], { queryParams: { hashtag: this.searchQuery } });
  }
  onCategoryClick(category: string) {
    console.log("category", category)
    // this.router.navigate(['/search'], { queryParams: { q: category } });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();

    if (this.unsubscribeCart) {
      this.unsubscribeCart();
    }
  }


}
