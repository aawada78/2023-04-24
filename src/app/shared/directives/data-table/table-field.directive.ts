import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableField]'
})
export class TableFieldDirective {
  // Needs to be disabled, otherwise the structural directive is not working
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appTableFieldAs') propName = '';

  constructor(public templateRef: TemplateRef<unknown>) {}
}
