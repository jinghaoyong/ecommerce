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
import { SalesCategoriesService } from '../../../core/services/sales-categories/sales-categories.service';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ProductsService } from '../../../core/services/products/products.service';
import { SPECIAL_CONTENT_STRING } from '../../../core/constants/enum';
import { QuerySearchService } from '../../services/querySearch/query-search.service';
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SalesProductsComponent, NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  products: any[] = [
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

  lastProductsDoc: DocumentData | undefined = undefined;

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

  // for firestore pagination
  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
  allLoaded: boolean = false;
  loading: boolean = false;


  constructor(
    private specialContentServ: SpecialContentService,
    private route: ActivatedRoute,
    private productServ: DiscountProductsService,
    private spinServ: SpinnerService,
    private salesCategoriesServ: SalesCategoriesService,
    private productsServ: ProductsService,
    private querySearchServ: QuerySearchService
  ) {
    scrollToTop();
    this.loadSpecialContents();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCheckbox = params['category'];
      this.hashtagQ = params['hashtag'];

      this.loadMore();

      if (this.hashtagQ) {

        this.products = [];
        console.log("this.hashtagQ", this.hashtagQ)
        this.loadMoreHashtagSearch(this.hashtagQ);
        // this.productServ.getProductsByHashtagSearch(this.hashtagQ).then(products => {
        //   if (products?.length > 0) this.products = products;

        //   this.spinServ.requestEnded();
        // }).catch(error => {
        //   console.error('Error fetching products by hashtag:', error);
        //   this.spinServ.requestEnded();
        // });
      }
    });


  }

  async loadMoreHashtagSearch(query: string) {
    this.spinServ.requestStarted();
    if (this.loading || this.allLoaded) {
      this.spinServ.requestEnded();
      return;
    }

    this.loading = true;
    try {
      const result = await this.productServ.getProductsByHashtagSearch(query, this.lastVisible);
      this.products.push(...result.products);
      this.lastVisible = result.lastVisible;

      if (result.products.length < 6) {
        this.allLoaded = true;
      }
      this.spinServ.requestEnded();
    } catch (error) {
      console.error('Hashtag search failed', error);
      this.spinServ.requestEnded();
    } finally {
      this.loading = false;
      this.spinServ.requestEnded();
    }
  }


  isChecked(title: string): boolean {
    return this.selectedCheckbox === title;
  }

  onCheckboxChange(title: string) {
    this.querySearchServ.clearQuery();
    // console.log("title", title)
    this.lastVisible = null;
    this.allLoaded = false;
    this.loading = false;
    this.selectedCheckbox = this.selectedCheckbox === title ? null : title;
    this.loadMore();
  }

  pageChange(event: any) {

  }

  async loadInitialBestSellers() {

    const newItems = await this.salesCategoriesServ.getBestSellersPaginated(undefined);
    if (newItems.length > 0) {
      this.products = newItems;
      this.lastProductsDoc = newItems[newItems.length - 1]._doc; // ✅ Store last doc here
      console.log("loadInitialBestSellers this.lastProductsDoc", this.lastProductsDoc)
    }
    this.spinServ.requestEnded();
  }

  async loadMore() {
    this.spinServ.requestStarted();
    if (this.loading || this.allLoaded) {
      this.spinServ.requestEnded();
      return;
    }

    this.loading = true;
    this.products = [];
    try {
      console.log("this.lastVisible", this.lastVisible)
      let result: any;

      if (this.selectedCheckbox === SPECIAL_CONTENT_STRING.BEST_SELLING) {
        result = await this.productsServ.getBestSellingProducts(this.lastVisible);
      } else if (this.selectedCheckbox === SPECIAL_CONTENT_STRING.NEW_ARRIVAL) {
        result = await this.productsServ.getNewArrivalProducts(this.lastVisible);
      } else if (this.selectedCheckbox === SPECIAL_CONTENT_STRING.MOST_VIEWED) {
        result = await this.productsServ.getMostViewedProducts(this.lastVisible);
      }

      if (result?.products?.length > 0) {
        console.log("result", result)
        this.products.push(...result.products);
        this.lastVisible = result.lastVisible;

        if (result.products.length < 6) {
          this.allLoaded = true;
        }
      }


      this.spinServ.requestEnded();
    } catch (error) {

      console.error('Failed to load products', error);
      this.spinServ.requestEnded();
    } finally {
      this.loading = false;
      this.spinServ.requestEnded();
    }
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
