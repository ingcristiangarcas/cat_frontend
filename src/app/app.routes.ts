import { Routes } from '@angular/router';
import { BreedsComponent } from './features/breeds/breeds.component';
import { BreedsTableComponent } from './breeds-table/breeds-table.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tabla', component: BreedsTableComponent },
  { path: 'breeds', component: BreedsComponent, canActivate: [AuthGuard] },
  { path: 'guardian', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  // luego agregaremos más vistas
];

