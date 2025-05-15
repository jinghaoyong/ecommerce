import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpecialContentService } from '../../../core/services/special-content/special-content.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SalesCategoriesService } from '../../../core/services/sales-categories/sales-categories.service';

@Component({
  selector: 'app-special-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './special-content.component.html',
  styleUrl: './special-content.component.scss'
})
export class SpecialContentComponent implements OnInit, OnDestroy {
  allSpecialContents?: any[];

  specialContent1?: any;
  specialContent2?: any;
  specialContent3?: any;

  products?: any[] = [];

  constructor(
    private specialContentServ: SpecialContentService,
    private salesCategoriesServ: SalesCategoriesService,
    private router: Router
  ) {
    // this.loadSpecialContents();
    this.getMostViewProducts();
  }

  async loadSpecialContents() {
    try {
      this.allSpecialContents = await this.specialContentServ.getSpecialContent();
      this.specialContent1 = this.allSpecialContents.filter(content => content.tier === 1);
      this.specialContent2 = this.allSpecialContents.filter(content => content.tier === 2);
      this.specialContent3 = this.allSpecialContents.filter(content => content.tier === 3);
      console.log("special content 123", this.specialContent1, this.specialContent2, this.specialContent3)
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }

  async getMostViewProducts() {
    try {
      this.products = await this.salesCategoriesServ.getMostViewed();
      console.log("most view products", this.products)
    } catch (error) {
      console.error('Error loading this.salesCategoriesServ.getMostViewed();:', error);
    }
  }

  goToProductDetails(product: any) {
    this.router.navigate(['/productdetails', product.id]);
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
