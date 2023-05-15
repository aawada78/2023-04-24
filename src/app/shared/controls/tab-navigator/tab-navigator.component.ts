import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabbedPaneService } from '../tabbed-pane/tabbed-pane.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss']
})
export class TabNavigatorComponent implements OnInit {
  page = 0;
  pageCount = 0;
  // @Output() pageChange = new EventEmitter<number>();

  constructor(private tabbedPaneService: TabbedPaneService) {}

  ngOnInit(): void {
    this.tabbedPaneService.currentPage.subscribe({
      next: (currentPage) => {
        this.page = currentPage;
      }
    });

    this.tabbedPaneService.pageCount.subscribe({
      next: (count) => {
        this.pageCount = count;
      }
    });
  }

  prev(): void {
    if (this.page <= 0) {
      return;
    }

    this.page--;
    // this.pageChange.emit(this.page);
    this.tabbedPaneService.currentPage.next(this.page);
  }

  next(): void {
    if (this.page >= this.pageCount - 1) {
      return;
    }

    this.page++;
    // this.pageChange.emit(this.page);
    this.tabbedPaneService.currentPage.next(this.page);
  }
}
