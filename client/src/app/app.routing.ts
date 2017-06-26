import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SplitComponent } from './components/split/split.component';
import { AdminComponent } from './components/admin/admin.component';
import { CanActivateGuard } from './guards/CanActivateGuard';

const APP_ROUTES : Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full'},
	{ path: 'home', component: HomeComponent},
	{ path: 'split', component: SplitComponent, canActivate:[ CanActivateGuard ]},	
	{ path: 'admin', component: AdminComponent},
]

export const routing = RouterModule.forRoot(APP_ROUTES);