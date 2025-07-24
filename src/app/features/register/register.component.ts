import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        // ✅ Al registrarse exitosamente, volvemos al login
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Error al registrar el usuario';
        console.error(err);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }

  get isRegisterDisabled(): boolean {
    return (
      !this.username.trim() ||
      !this.email.trim() ||
      !this.password.trim() ||
      !this.confirmPassword.trim() ||
      this.isLoading
    );
  }
}
