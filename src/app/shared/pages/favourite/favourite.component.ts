import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { CommonModule } from '@angular/common';
import { FavouriteService } from '../../../core/services/favourite/favourite.service';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent implements OnInit {
  // This component is responsible for displaying the favourite items of the user.  
  cartItems = [
    {
      id: 1,
      name: 'Wireless Headphones',
      variation: 'Color: Black',
      image: 'https://via.placeholder.com/60',
      price: 59.99,
      quantity: 1
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      variation: 'Color: Blue',
      image: 'https://via.placeholder.com/60',
      price: 89.50,
      quantity: 2
    },
    {
      id: 3,
      name: 'Smartwatch Series 5',
      variation: 'Size: Medium',
      image: 'https://via.placeholder.com/60',
      price: 120.00,
      quantity: 1
    }
  ];

  constructor(
    private localStorageServ: LocalstorageService,
    private firebaseServ: FirebaseService,
    private favouriteServ: FavouriteService
  ) {

  }
  ngOnInit(): void {

    const currentUser = this.localStorageServ.getCurrentUser();
    console.log("currentUser", currentUser);

    this.firebaseServ.getUserDataById(currentUser?.userId).then((userData) => {
      console.log("getUserDataById userData", userData);
      if (userData?.favourite && userData?.favourite?.length > 0) {
        this.favouriteServ.getProductsByIds(userData?.favourite).then((products) => {
          console.log("getProductByIds products", products);
        })
      }
    });
  }

  getTotalPrice(item: any): number {
    return item.price * item.quantity;
  }
}
