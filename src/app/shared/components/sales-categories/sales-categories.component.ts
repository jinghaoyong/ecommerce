import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SalesProductsComponent } from '../sales-products/sales-products.component';
import { SalesCategoriesService } from '../../../core/services/sales-categories/sales-categories.service';


@Component({
  selector: 'app-sales-categories',
  standalone: true,
  imports: [SalesProductsComponent],
  templateUrl: './sales-categories.component.html',
  styleUrls: ['./sales-categories.component.scss'],
})
export class SalesCategoriesComponent implements OnInit {
  selectedCategory: string = 'Best Seller';
  categories: string[] = ['Best Seller', 'New Arrivals', 'Hot Sales'];
  // products: Array<{ name: string, category: string }> = [
  //   { name: 'Product 1', category: 'Best Seller' },
  //   { name: 'Product 2', category: 'Best Seller' },
  //   { name: 'Product 3', category: 'Best Seller' },
  //   { name: 'Product x', category: 'Best Seller' },
  //   { name: 'Product y', category: 'Best Seller' },
  //   { name: 'Product v', category: 'Best Seller' },
  //   { name: 'Product z', category: 'Best Seller' },
  //   { name: 'Product 4', category: 'New Arrivals' },
  //   { name: 'Product 5', category: 'New Arrivals' },
  //   { name: 'Product 6', category: 'New Arrivals' },
  //   { name: 'Product 7', category: 'Hot Sales' },
  //   { name: 'Product 8', category: 'Hot Sales' },
  //   { name: 'Product 9', category: 'Hot Sales' },
  //   { name: 'Product 10', category: 'Best Seller' },
  //   { name: 'Product 11', category: 'New Arrivals' },
  //   { name: 'Product 12', category: 'Hot Sales' },
  // ];
  // filteredProducts: Array<{ name: string, category: string }> = [];
  animate: boolean = false;

  products?: any[]

  constructor(
    private salesCategoriesServ: SalesCategoriesService
  ) {
    this.filterProducts("bestSeller");
  }



  ngOnInit() {
    // this.filterProducts(this.selectedCategory);
  }



  async loadProducts(category: string) {
    try {
      this.products = await this.salesCategoriesServ.getProductsByCategories(category);
      console.log("products", this.products)
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }

  filterProducts(category: string) {
    this.loadProducts(category);

    this.animate = false; // Reset animation
    setTimeout(() => {
      this.animate = true; // Trigger animation
    }, 0);
  }
}