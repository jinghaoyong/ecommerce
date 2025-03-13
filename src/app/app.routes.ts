import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { authGuard } from './account/auth/auth.guard';
import { ProductDetailsComponent } from './shared/pages/product-details/product-details.component';
import { SearchResultsComponent } from './shared/pages/search-results/search-results.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: 'productdetails', component: ProductDetailsComponent, canActivate: [authGuard], },
    { path: 'searchresults', component: SearchResultsComponent, canActivate: [authGuard], }
];
