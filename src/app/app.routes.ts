import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { authGuard } from './account/auth/auth.guard';
import { ProductDetailsComponent } from './shared/pages/product-details/product-details.component';
import { SearchResultsComponent } from './shared/pages/search-results/search-results.component';
import { FavouriteComponent } from './shared/pages/favourite/favourite.component';
import { ShoppingCartComponent } from './shared/pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './shared/pages/checkout/checkout.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'productdetails/:id', component: ProductDetailsComponent, canActivate: [authGuard], },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], },
    { path: 'searchresults', component: SearchResultsComponent, canActivate: [authGuard], },
    { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [authGuard], }
];
