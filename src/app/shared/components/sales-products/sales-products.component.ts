import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sales-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-products.component.html',
  styleUrl: './sales-products.component.scss'
})
export class SalesProductsComponent {

  @Input() filteredProducts?: any;

}
