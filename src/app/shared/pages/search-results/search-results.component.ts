import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SalesProductsComponent } from '../../components/sales-products/sales-products.component';
import { scrollToTop } from '../../services/utils/utils';
import { SpecialContentService } from '../../../core/services/special-content/special-content.service';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DiscountProductsService } from '../../../core/services/discount-products/discount-products.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SalesProductsComponent, NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  products?: any[] = [
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

  hashtagQ?: string;

  //for pagination
  currentPage: number = 1;
  pageSize: number = 10;
  selectedPageSize?: number;
  recordCount: number = 0;
  showingEntriesText?: string;
  sortNameOrder: number = 0;

  constructor(
    private specialContentServ: SpecialContentService,
    private route: ActivatedRoute,
    private productServ: DiscountProductsService,
    private spinServ: SpinnerService
  ) {
    scrollToTop();
    this.loadSpecialContents();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCheckbox = params['category'];
      this.hashtagQ = params['hashtag'];

      if (this.selectedCheckbox) {
        this.spinServ.requestStarted();
        if (this.selectedCheckbox === "Summer hot product") {
          console.log("this.selectedCheckbox ", this.selectedCheckbox)
          this.productServ.getSeasonalProducts().then(products => {
            this.products = products;
            this.spinServ.requestEnded();
          }).catch(error => {
            this.spinServ.requestEnded();
            console.error('Error fetching seasonal products:', error);
          });
          console.log("this.products", this.products)
        } else if (this.selectedCheckbox === "Top picker") {
          this.productServ.getTopPickedProducts().then(products => {
            this.products = products;
            this.spinServ.requestEnded();
          }).catch(error => {
            this.spinServ.requestEnded();
            console.error('Error fetching seasonal products:', error);
          });
        } else if (this.selectedCheckbox === "Crystal Collections 2025") {
          this.productServ.getThisYearProducts().then(products => {
            this.products = products;
            this.spinServ.requestEnded();
          }).catch(error => {
            this.spinServ.requestEnded();
            console.error('Error fetching seasonal products:', error);
          });
        }

      }

      if (this.hashtagQ) {
        this.spinServ.requestStarted();
        this.products = [];
        console.log("this.hashtagQ", this.hashtagQ)
        this.productServ.getProductsByHashtagSearch(this.hashtagQ).then(products => {
          this.products = products;
          this.spinServ.requestEnded();
        }).catch(error => {
          console.error('Error fetching products by hashtag:', error);
        });
      }
    });


  }


  isChecked(title: string): boolean {
    return this.selectedCheckbox === title;
  }

  onCheckboxChange(title: string) {
    console.log("title", title)
    this.selectedCheckbox = this.selectedCheckbox === title ? null : title;
    if (this.selectedCheckbox === "Summer hot product") {
      console.log("this.selectedCheckbox ", this.selectedCheckbox)
      this.productServ.getSeasonalProducts().then(products => {
        this.products = products;
      }).catch(error => {
        console.error('Error fetching seasonal products:', error);
      });
      console.log("this.products", this.products)
    } else if (this.selectedCheckbox === "Top picker") {
      this.productServ.getTopPickedProducts().then(products => {
        this.products = products;
      }).catch(error => {
        console.error('Error fetching seasonal products:', error);
      });
    } else if (this.selectedCheckbox === "Crystal Collections 2025") {
      this.productServ.getThisYearProducts().then(products => {
        this.products = products;
      }).catch(error => {
        console.error('Error fetching seasonal products:', error);
      });
    }
  }

  pageChange(event: any) {

  }

  pageLengthChange(event: any) {

  }

  getMoreProducts() {

  }

  async loadSpecialContents() {
    try {
      this.allSpecialContents = await this.specialContentServ.getSpecialContent();
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }
}
