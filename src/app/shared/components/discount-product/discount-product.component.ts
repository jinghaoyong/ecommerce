import { Component, OnInit } from '@angular/core';
import { DiscountProductsService } from '../../../core/services/discount-products/discount-products.service';

@Component({
  selector: 'app-discount-product',
  standalone: true,
  imports: [],
  templateUrl: './discount-product.component.html',
  styleUrl: './discount-product.component.scss'
})
export class DiscountProductComponent implements OnInit {
  selectedCategory: string = 'Best Seller'; // Default selected category
  product: any = {  // Replace with actual product data
    name: 'Multi-pocket Chest Bag Black',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id feugiat eros.'
  };
  countdown: any = { // Replace with actual countdown data
    days: 29,
    hours: 12,
    minutes: 54,
    seconds: 41
  };

  // discountProducts

  constructor(
    private discountProductServ: DiscountProductsService
  ) {
    // const discountproductRes = 
    // console.log("discountproductRes",discountproductRes)
  }

  ngOnInit(): void { }

  async loadDiscountProducts() {
    // try {
    //   this.allSpecialContents = await this.discountProductServ.getBestSellerProducts();

    // } catch (error) {
    //   console.error('Error loading special contents:', error);
    // }
  }

  filterProducts(category: string): void {
    this.selectedCategory = category;
    // Implement your logic to filter products based on category
  }
}