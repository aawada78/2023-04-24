import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]',
  standalone: true
})
export class ClickWithWarningDirective implements OnInit {
  @Input() warningMessage = 'Are you Sure?';
  @Output() appClickWithWarning = new EventEmitter();

  @HostBinding('class') classBinding = 'btn btn-danger';
  @HostListener('click', ['$event.shiftKey'])
  handleClick(shiftKey: boolean): void {
    if (shiftKey || confirm(this.warningMessage)) {
      this.appClickWithWarning.emit();
    }
  }

  //constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.elementRef.nativeElement.setAttribute('class', 'btn btn-danger');
  }
}
