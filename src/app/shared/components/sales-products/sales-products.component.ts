import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FavouriteService } from '../../../core/services/favourite/favourite.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

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
    private shoppingCartServ: FavouriteService,
    private localStorageServ: LocalstorageService
  ) {

  }

  addToCart(product: any): void {
    const currentUser = this.localStorageServ.getCurrentUser();
    if (!currentUser?.userId) return;

    this.shoppingCartServ.addItemToShoppingCart(currentUser.userId, product)
      .then(() => console.log('Added to cart'))
      .catch((err) => console.error('Failed to add to cart', err));
  }
}
