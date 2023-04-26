import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName = '';

  isLoggedIn(): boolean {
    return !!this.userName;
  }

  login() {
    this.userName = 'Assaad';
  }

  logout() {
    this.userName = '';
  }
}
