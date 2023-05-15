import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableField]'
})
export class TableFieldDirective {
  // Needs to be disabled, otherwise the structural directive is not working with the as-suffix
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appTableFieldAs') propName = '';

  // @Input() appTableFieldAs = '';

  constructor(public templateRef: TemplateRef<unknown>) {}
}
