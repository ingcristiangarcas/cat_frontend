import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string; // opcional, aunque no deberías usarla
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // 🔥 Ajusta según tu backend

  constructor(private http: HttpClient) {}

  // ✅ LOGIN: guarda datos de usuario (no hay token)
  login(username: string, password: string): Observable<UserResponse> {
  return this.http.post<UserResponse>(`${this.apiUrl}/users/login`, { username, password }).pipe(
    tap((res: UserResponse) => {
      console.log('🔹 RESPUESTA LOGIN:', res); // 👈 esto debe mostrar tu objeto
      if (res && res.id) {
        
        localStorage.setItem('userId', res.id.toString());
        localStorage.setItem('username', res.username);
        localStorage.setItem('email', res.email);
        console.log('✅ Datos de sesión guardados en localStorage');
      } else {
        console.warn('⚠️ Respuesta inesperada, no se guardó nada');
      }
    })
  );
}


  // ✅ REGISTER
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { username, email, password });
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  // ✅ Saber si está logueado
  isLoggedIn(): boolean {
    // Devuelve true si hay un userId guardado
    return !!localStorage.getItem('userId');
  }

  // ✅ Obtener datos del usuario logueado
  getCurrentUser(): any {
    const id = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (id && username && email) {
      return { id: Number(id), username, email };
    }
    return null;
  }
}
