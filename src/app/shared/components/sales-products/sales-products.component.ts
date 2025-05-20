import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FavouriteService } from '../../../core/services/favourite/favourite.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-sales-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-products.component.html',
  styleUrl: './sales-products.component.scss'
})
export class SalesProductsComponent {
  @Input() filteredProducts?: any;


  constructor(
    // private shoppingCartServ: FavouriteService,
    private shoppingCartServ: ShoppingCartService,
    private localStorageServ: LocalstorageService,
    private router: Router,
    private toastServ: ToastService
  ) {

  }

  addToCart(product: any): void {
    const currentUser = this.localStorageServ.getCurrentUser();
    if (!currentUser?.userId) return;

    this.shoppingCartServ.addItemToShoppingCart(currentUser.userId, product)
      .then(() => this.toastServ.show('Product added to cart!', 'success'))
      .catch(() => this.toastServ.show('Failed to add product.', 'error'));
  }

  goToProductDetails(product: any) {
    this.router.navigate(['/productdetails', product.id]);
  }
}
