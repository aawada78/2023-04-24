import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TableFieldDirective } from '../../directives/data-table/table-field.directive';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: Array<any> = [];

  @ContentChildren(TableFieldDirective)
  fields: QueryList<TableFieldDirective> | undefined;

  get fieldList(): Array<TableFieldDirective> {
    return this.fields?.toArray() ?? [];
  }
}
