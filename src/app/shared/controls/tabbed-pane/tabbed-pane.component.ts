import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { TabbedPaneService } from './tabbed-pane.service';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss'],
  viewProviders: [TabbedPaneService]
})
export class TabbedPaneComponent implements AfterContentInit {
  //tabs: Array<TabComponent> = [];
  @ContentChildren(TabComponent)
  tabQueryList: QueryList<TabComponent> | undefined;
  activeTab: TabComponent | undefined;
  currentPage = 0;

  constructor(private tabbedPaneService: TabbedPaneService) {}

  get tabs(): TabComponent[] {
    return this.tabQueryList?.toArray() ?? [];
  }

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      this.active(this.tabs[0]);
    }

    this.tabbedPaneService.currentPage.subscribe({
      next: (currentPage) => {
        if (currentPage === this.currentPage) {
          return;
        }

        this.pageChange(currentPage);
      }
    });

    this.tabbedPaneService.pageCount.next(this.tabs.length);
  }
  // register(tab: TabComponent) {
  //   this.tabs.push(tab);
  // }

  active(active: TabComponent) {
    for (const tab of this.tabs) {
      tab.visible = tab === active;
    }

    this.activeTab = active;
    this.currentPage = this.tabs.indexOf(active);

    this.tabbedPaneService.currentPage.next(this.currentPage);
  }

  pageChange(pageNumber: number): void {
    this.active(this.tabs[pageNumber]);
  }
}
