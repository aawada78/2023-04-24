import { Directive, ElementRef, EmbeddedViewRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') template: TemplateRef<unknown> | undefined;

  private viewRef: EmbeddedViewRef<unknown> | undefined;

  constructor(private viewContainer: ViewContainerRef, private host: ElementRef) {}

  // @HostListener('mouseover')
  // handleMouseover(): void {
  //   this.setHidden(false);
  // }

  // @HostListener('mouseout', ['$event.shiftKey'])
  // handleMouseout(shiftKey: boolean): void {
  //   if (!shiftKey) {
  //     this.setHidden(true);
  //   }
  // }

  @HostListener('focusin')
  handleFocusIn(): void {
    this.setHidden(false);
  }

  @HostListener('focusout')
  handleFocusOut(): void {
    setTimeout(() => this.setHidden(true), 500);
  }

  ngOnInit(): void {
    if (!this.template) {
      return;
    }

    this.viewRef = this.viewContainer.createEmbeddedView(this.template, {
      $implicit: 'My super dupa Tooltip!',
      description: 'This is my desciption!',
      helpLink: 'https://google.com'
    });

    this.setHidden(true);

    // const element = this.host.nativeElement as HTMLElement;
    // element.addEventListener('mouseover', () => {
    //   this.setHidden(false);
    // });
  }

  setHidden(hidden: boolean): void {
    this.viewRef?.rootNodes.forEach((element) => (element.hidden = hidden));
  }
}
