import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: string;

  constructor() {
    this.userName = '';
  }

  isLoggedIn(): boolean {
    return !!this.userName;
  }

  login() {
    this.userName = 'Brainy Smurf';
  }

  logout() {
    this.userName = '';
  }
}
