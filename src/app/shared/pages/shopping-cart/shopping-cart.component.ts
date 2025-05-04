import { Component, NgModule, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutData, CheckoutItem } from '../../../core/interfaces/@type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  cartItems?: any[] = [];
  currentUser?: any;

  // Checkbox selection tracking
  selectedItems: any[] = [];
  selectAllChecked: boolean = false;

  constructor(
    private localStorageServ: LocalstorageService,
    private firebaseServ: FirebaseService,
    private shoppingCartServ: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageServ.getCurrentUser();
    console.log('Current User:', this.currentUser);

    if (this.currentUser?.userId) {
      this.loadCartItems(this.currentUser.userId);
    }
  }

  async loadCartItems(userId: string): Promise<void> {
    try {
      this.cartItems = await this.shoppingCartServ.getShoppingCartByUserId(userId);

      // Initialize checkbox state
      this.cartItems.forEach(item => item.selected = false);
      this.selectedItems = [];
      this.selectAllChecked = false;

      console.log('Loaded Cart Items:', this.cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  async decreaseQty(item: any): Promise<void> {
    await this.shoppingCartServ.updateCartItemQuantity(this.currentUser.userId, item.id, -1);
    await this.loadCartItems(this.currentUser.userId);
  }

  async increaseQty(item: any): Promise<void> {
    await this.shoppingCartServ.updateCartItemQuantity(this.currentUser.userId, item.id, 1);
    await this.loadCartItems(this.currentUser.userId);
  }

  async removeItem(item: any): Promise<void> {
    await this.shoppingCartServ.removeItemFromCart(this.currentUser.userId, item.id);
    await this.loadCartItems(this.currentUser.userId);
  }

  getTotalPrice(item: any): number {
    return item.quantity * Number(item.discountPrice ?? item.price ?? 0);
  }

  updateSelectedItems(): void {
    if (this.cartItems) {
      this.selectedItems = this.cartItems.filter(item => item.selected);
      this.selectAllChecked = this.selectedItems.length === this.cartItems.length;
    }
  }

  toggleSelectAll(): void {
    if (this.cartItems) {
      this.cartItems.forEach(item => item.selected = this.selectAllChecked);
      this.updateSelectedItems();
    }
  }

  getSelectedTotal(): number {
    return this.selectedItems.reduce((sum, item) =>
      sum + item.quantity * Number(item.discountPrice ?? item.price ?? 0), 0);
  }

  onBuySelectedItems() {
    const checkoutItems: CheckoutItem[] = this.selectedItems.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.discountPrice,
      quantity: item.quantity,
      imageUrl: item.imageUrl
    }));

    const totalAmount = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const checkoutData: CheckoutData = {
      items: checkoutItems,
      totalAmount,
    };

    this.router.navigate(['/checkout'], { state: checkoutData });
  }
}
