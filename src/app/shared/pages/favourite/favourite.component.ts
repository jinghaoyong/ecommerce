import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent implements OnInit {
  // This component is responsible for displaying the favourite items of the user.  
  constructor(
    private localStorageServ: LocalstorageService,
    private firebaseServ: FirebaseService
  ) {

  }
  ngOnInit(): void {

    const currentUser = this.localStorageServ.getCurrentUser();
    console.log("currentUser", currentUser);

    this.firebaseServ.getUserDataById(currentUser?.userId).then((userData) => {
      console.log("getUserDataById userData", userData);
    });
  }
}
