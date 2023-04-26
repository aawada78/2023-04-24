import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClickWithWarningDirective, TooltipDirective } from '../shared';
import { CustomerComponent } from './customer.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full'
  },
  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      {
        path: '',
        redirectTo: 'booking-history',
        pathMatch: 'full'
      },
      {
        path: 'booking-history',
        component: BookingHistoryComponent
      }
    ]
  }
];

@NgModule({
  declarations: [BookingHistoryComponent, CustomerComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(CUSTOMER_ROUTES), ClickWithWarningDirective, TooltipDirective]
})
export class CustomerModule {}
