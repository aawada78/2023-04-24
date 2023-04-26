import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {
  private router = inject(Router);

  navigateAndResetBasket(route: string) {
    this.router.navigate([{ outlets: { aux: null } }]);
    // this.router.navigate(['/' + route]);
  }
}
