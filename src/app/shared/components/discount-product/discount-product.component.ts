import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void { }

  filterProducts(category: string): void {
    this.selectedCategory = category;
    // Implement your logic to filter products based on category
  }
}