import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { SpecialContentComponent } from '../../components/special-content/special-content.component';
import { SalesCategoriesComponent } from '../../components/sales-categories/sales-categories.component';
import { DiscountProductComponent } from '../../components/discount-product/discount-product.component';
import { SocialMedialImagesComponent } from "../../components/social-medial-images/social-medial-images.component";
import { BlogpostsSectionComponent } from "../../components/blogposts-section/blogposts-section.component";
import { HomepageFooterComponent } from "../../components/homepage-footer/homepage-footer.component";

@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [BannerComponent, SpecialContentComponent, SalesCategoriesComponent, DiscountProductComponent, SocialMedialImagesComponent, BlogpostsSectionComponent, HomepageFooterComponent]
})
export class HomepageComponent {

}
