import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SalesProductsComponent } from '../../components/sales-products/sales-products.component';
import { scrollToTop } from '../../services/utils/utils';
import { SpecialContentService } from '../../../core/services/special-content/special-content.service';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SalesProductsComponent, NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  products = [
    {
      image: 'assets/images/product1.jpg',
      title: '[13-17 inch] Laptop Sleeve Soft Case',
      price: '13.90',
      rating: '4.9',
      sold: '724',
      shipping: 'Free Shipping',
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Deli Laptop Bag Office Work Men Business',
      price: '11.99',
      rating: '4.9',
      sold: '101',
      shipping: 'Free Shipping',
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Deli Laptop Bag Office Work Men Business',
      price: '11.99',
      rating: '4.9',
      sold: '101',
      shipping: 'Free Shipping',
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Deli Laptop Bag Office Work Men Business',
      price: '11.99',
      rating: '4.9',
      sold: '101',
      shipping: 'Free Shipping',
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Deli Laptop Bag Office Work Men Business',
      price: '11.99',
      rating: '4.9',
      sold: '101',
      shipping: 'Free Shipping',
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Deli Laptop Bag Office Work Men Business',
      price: '11.99',
      rating: '4.9',
      sold: '101',
      shipping: 'Free Shipping',
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Deli Laptop Bag Office Work Men Business',
      price: '11.99',
      rating: '4.9',
      sold: '101',
      shipping: 'Free Shipping',
    },
  ];

  allSpecialContents?: any[] = [];

  selectedCheckbox: string | null = null;

  //for pagination
  currentPage: number = 1;
  pageSize: number = 10;
  selectedPageSize?: number;
  recordCount: number = 0;
  showingEntriesText?: string;
  sortNameOrder: number = 0;

  constructor(
    private specialContentServ: SpecialContentService,
    private route: ActivatedRoute
  ) {
    scrollToTop();
    this.loadSpecialContents();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCheckbox = params['category'];
    });
  }


  isChecked(title: string): boolean {
    return this.selectedCheckbox === title;
  }

  onCheckboxChange(title: string) {
    this.selectedCheckbox = this.selectedCheckbox === title ? null : title;
  }

  pageChange(event: any) {

  }

  pageLengthChange(event: any) {

  }

  async loadSpecialContents() {
    try {
      this.allSpecialContents = await this.specialContentServ.getSpecialContent();
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }
}
