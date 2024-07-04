import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../../core/services/firebase.service';
import { UserData } from '../../../core/interfaces/@type';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  currentUser?: UserData;

  constructor(private firebaseServ: FirebaseService) { }

  ngOnInit(): void {
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

}
