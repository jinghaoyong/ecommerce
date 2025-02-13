import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../../core/services/firebase.service';
import { UserData } from '../../../core/interfaces/@type';
import { CommonModule } from '@angular/common';
import { TitlestringService } from '../../../core/services/titleString/titlestring.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly prefixTranslate = 'NAVBAR.';
  isStickyNav = false; // Default is non-sticky

  currentUser?: any;
  fallbackImage?: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'

  titleString?: any[];

  constructor(
    private firebaseServ: FirebaseService,
    private titleStringServ: TitlestringService,
    private router: Router
  ) {
    this.currentUser = this.firebaseServ.currentUserValue;
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

  onLogout(): void {
    // this.authServ.logout();
    // this.router.navigateByUrl('/')
    this.firebaseServ.logout();
  }


}
