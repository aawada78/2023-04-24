import { AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasketService } from './basket.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  standalone: true,
  imports: [JsonPipe, AsyncPipe, RouterModule, NgIf, NgForOf, KeyValuePipe]
})
export class BasketComponent {
  basketService = inject(BasketService);
}
