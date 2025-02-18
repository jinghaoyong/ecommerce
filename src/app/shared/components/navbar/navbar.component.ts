import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../../core/services/firebase.service';
import { UserData } from '../../../core/interfaces/@type';
import { CommonModule } from '@angular/common';
import { TitlestringService } from '../../../core/services/titleString/titlestring.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Tooltip, Popover } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly prefixTranslate = 'NAVBAR.';
  isStickyNav = false; // Default is non-sticky

  currentUser?: any;
  fallbackImage?: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'

  titleString?: any[];

  // for search bar and cateogires 
  categories: string[] = [
    "Powerbank", "Glad2glow", "Handbag", "Tumbler", "Rak Kasut",
    "Skintific", "LEGO", "Pencil Case", "Earphone", "Bluetooth"
  ];

  searchQuery: string = "";


  constructor(
    private firebaseServ: FirebaseService,
    private titleStringServ: TitlestringService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentUser = this.firebaseServ.currentUserValue;
    this.translate.setDefaultLang('en'); // Set default language
    this.translate.use('en'); // Use English initially
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
      }
    });

    console.log("currentUser", this.firebaseServ.currentUserValue)
    this.currentUser = this.firebaseServ.currentUserValue;
    console.log("currentUser", this.currentUser)

    this.loadTitleString();

  }

  ngAfterViewInit(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => new Popover(popoverTriggerEl));
  }

  async loadTitleString() {
    this.titleString = await this.titleStringServ.getTitleString();
    console.log("loadTitleString", this.titleString)
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
  }


}
