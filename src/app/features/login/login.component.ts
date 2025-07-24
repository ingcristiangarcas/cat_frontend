import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.username || !this.password) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/breeds']); // ✅ Vista 1 (tabla de gatos)
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Credenciales inválidas';
        console.error(err);
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  get isLoginDisabled(): boolean {
    return !this.username.trim() || !this.password.trim() || this.isLoading;
  }
}
