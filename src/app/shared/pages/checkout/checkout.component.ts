import { Component, OnInit } from '@angular/core';
import { CheckoutData } from '../../../core/interfaces/@type';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutData: CheckoutData = { items: [], totalAmount: 0 };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const state = history.state as CheckoutData;
    if (state && state.items) {
      this.checkoutData = state;
    } else {
      this.router.navigate(['/cart']);
    }
  }

  proceedToPayment() {
    // Placeholder for Stripe or any payment integration
    alert('Proceeding to payment with total: $' + this.checkoutData.totalAmount);
  }
}