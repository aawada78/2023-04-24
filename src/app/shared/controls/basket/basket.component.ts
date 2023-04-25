import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasketService } from './basket.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  standalone: true,
  imports: [JsonPipe, AsyncPipe, RouterModule]
})
export class BasketComponent {
  basketService = inject(BasketService);

  router = inject(Router);

  close() {
    this.router.navigate(['/', { outlets: { aux: null } }]);
  }
}
