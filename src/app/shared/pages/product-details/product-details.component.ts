import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDetailsService } from '../../../core/services/product-details/product-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { CheckoutData, CheckoutItem } from '../../../core/interfaces/@type';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId?: any;

  productDetails?: any;

  constructor(
    private productServ: ProductDetailsService,
    private route: ActivatedRoute,
    private localStorageServ: LocalstorageService,
    private shoppingCartServ: ShoppingCartService,
    private router: Router,
    private toastServ: ToastService
  ) {

  }

  ngOnInit(): void {
    // Get the id parameter from URL
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      // You can now use this.productId to fetch product details
      this.productServ.getProductById(this.productId)
      if (this.productId) {
        this.loadProductDetails(this.productId);
      }
    });
  }

  async loadProductDetails(productId: string): Promise<void> {
    try {
      this.productDetails = await this.productServ.getProductById(productId);
      console.log("  async loadProductDetails", this.productDetails)
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  onSelectImage(i: number) {
    // this.selectedImage = i;
  }
  onCheckDelivery() {
    // Demo: show alert or handle pincode delivery
    alert('Delivery check not implemented (dummy)!');
  }
  onAddToCart(product: any) {
    const currentUser = this.localStorageServ.getCurrentUser();
    if (!currentUser?.userId) {
      this.toastServ.show('Please log in first.', 'error');
      return;
    }

    this.shoppingCartServ.addItemToShoppingCart(currentUser.userId, product)
      .then(() => this.toastServ.show('Product added to cart!', 'success'))
      .catch(() => this.toastServ.show('Failed to add product.', 'error'));
  }

  onBuyNow(product: any) {
    const currentUser = this.localStorageServ.getCurrentUser();
    if (!currentUser?.userId) {
      this.toastServ.show('Please log in first.', 'error');
      return;
    }
    const checkoutItem: CheckoutItem = {
      productId: product.id,
      name: product.name,
      price: product.discountPrice,
      quantity: 1,
      imageUrl: product.imageUrl,
    };

    const checkoutData: CheckoutData = {
      items: [checkoutItem],
      totalAmount: product.discountPrice,
    };

    this.router.navigate(['/checkout'], { state: checkoutData });
  }
}
