import { Component, inject } from '@angular/core';
import { AuthService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  authService = inject(AuthService);

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
