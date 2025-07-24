import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  user: any;
  isSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getCurrentUser();
  }

  // Abre/cierra la barra lateral
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Cierra sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Volver a la vista de breeds
  goToBreeds(): void {
    this.router.navigate(['/breeds']);
  }
}
