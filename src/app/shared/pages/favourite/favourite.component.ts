import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { CommonModule } from '@angular/common';
import { FavouriteService } from '../../../core/services/favourite/favourite.service';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss'
})
export class FavouriteComponent implements OnInit {
  // This component is responsible for displaying the favourite items of the user.  
  cartItems?: any[] = [];
  currentUser?: any;
  constructor(
    private localStorageServ: LocalstorageService,
    private firebaseServ: FirebaseService,
    // private favouriteServ: FavouriteService
    private favouriteServ: ShoppingCartService
  ) {

  }
  ngOnInit(): void {

    this.currentUser = this.localStorageServ.getCurrentUser();
    console.log('Current User:', this.currentUser);

    if (this.currentUser?.userId) {
      this.loadCartItems(this.currentUser.userId);
    }
  }

  async loadCartItems(userId: string): Promise<void> {
    try {
      this.cartItems = await this.favouriteServ.getShoppingCartByUserId(userId);
      console.log('Loaded Cart Items:', this.cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }


  getTotalPrice(item: any): number {
    return item.quantity * parseFloat(item.discountPrice || item.price);
  }

  async decreaseQty(item: any): Promise<void> {
    if (item.quantity > 1) {
      await this.favouriteServ.updateCartItemQuantity(this.currentUser.userId, item.id, -1);
      item.quantity--;
    }
  }

  async increaseQty(item: any): Promise<void> {
    await this.favouriteServ.updateCartItemQuantity(this.currentUser.userId, item.id, 1);
    item.quantity++;
  }

  async removeItem(item: any): Promise<void> {
    await this.favouriteServ.removeItemFromCart(this.currentUser.userId, item.id);
    this.cartItems = (this.cartItems || []).filter(cartItem => cartItem.id !== item.id);

  }
}
