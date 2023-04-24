import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: 'customer/booking-history',
    component: BookingHistoryComponent
  }
];

@NgModule({
  declarations: [BookingHistoryComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(CUSTOMER_ROUTES)]
})
export class CustomerModule {}
