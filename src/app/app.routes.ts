import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { authGuard } from './account/auth/auth.guard';
import { ProductDetailsComponent } from './shared/pages/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent, canActivate: [authGuard], },
    { path: 'pd', component: ProductDetailsComponent, canActivate: [authGuard], }
];
