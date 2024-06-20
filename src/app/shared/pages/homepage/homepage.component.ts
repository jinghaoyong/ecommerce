import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { SpecialContentComponent } from '../../components/special-content/special-content.component';
import { SalesCategoriesComponent } from '../../components/sales-categories/sales-categories.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [BannerComponent, SpecialContentComponent, SalesCategoriesComponent]
})
export class HomepageComponent {

}
