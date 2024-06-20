import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { authGuard } from './account/auth/auth.guard';

export const routes: Routes = [
    { path: '', component: HomepageComponent, canActivate: [authGuard], }
];
