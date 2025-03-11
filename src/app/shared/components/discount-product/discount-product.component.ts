import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiscountProductsService } from '../../../core/services/discount-products/discount-products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discount-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discount-product.component.html',
  styleUrl: './discount-product.component.scss'
})
export class DiscountProductComponent implements OnInit, OnDestroy {
  selectedCategory: string = 'Best Seller'; // Default selected category
  selectedProduct?: any;
  product: any = {  // Replace with actual product data
    name: 'Multi-pocket Chest Bag Black',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id feugiat eros.'
  };
  countdown?: any;

  dealOfTheWeekProducts?: any[] = [];
  promotionEndTimestamp: number = 0;
  countdownInterval: any;
  constructor(
    private discountProductServ: DiscountProductsService
  ) {
    // const discountproductRes = 
    // console.log("discountproductRes",discountproductRes)
    this.loadDiscountProducts();
    this.startCountdownTimer();
  }

  ngOnInit(): void { }

  async loadDiscountProducts() {
    try {
      this.dealOfTheWeekProducts = await this.discountProductServ.getDealOfTheWeekProducts();
      if (this.dealOfTheWeekProducts.length > 0) {
        this.selectedProduct = this.dealOfTheWeekProducts[0];
        this.selectedCategory = this.dealOfTheWeekProducts[0].category;
        this.promotionEndTimestamp = this.dealOfTheWeekProducts[0]?.promotionEnd?.seconds * 1000; // Convert to milliseconds
        this.updateCountdown(); // Set initial countdown
      }
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }

  goToFilterPage(item: any): void {
    console.log("goToFilterPage item",item)
    this.selectedProduct = item;
    this.selectedCategory = item?.category;
    this.promotionEndTimestamp = item?.promotionEnd?.seconds * 1000; // Convert to milliseconds
    this.updateCountdown(); // Update countdown immediately
    this.restartCountdownTimer(); // Restart interval for the new countdown
  }

  restartCountdownTimer() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval); // Stop previous interval
    }
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  calculateDiscountRate(oriPrice: number, discountPrice: number): string {
    return `${Math.round(((oriPrice - discountPrice) / oriPrice) * 100)}%`;
  }

  calculateCountdown(promotionEnd: { seconds: number; nanoseconds: number }): { days: number; hours: number; minutes: number; seconds: number } {
    const now = new Date();
    const promotionEndDate = new Date(promotionEnd.seconds * 1000 + promotionEnd.nanoseconds / 1e6);
    const diffMs = promotionEndDate.getTime() - now.getTime(); // Difference in milliseconds

    if (diffMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Expired
    }

    return {
      days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
    };
  }

  startCountdownTimer() {
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000); // Update every second
  }

  updateCountdown() {
    const now = new Date().getTime();
    const diffMs = this.promotionEndTimestamp - now;

    if (diffMs <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.countdownInterval); // Stop countdown when expired
      return;
    }

    this.countdown = {
      days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
    };
  }

  ngOnDestroy() {
    clearInterval(this.countdownInterval); // Clean up interval when component is destroyed
  }
}