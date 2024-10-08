import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;
  private tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  @HostListener('window:scroll') onWindowScroll() {
    if (this.tooltipElement) {
      this.updateTooltipPosition();
    }
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, text);
    this.renderer.appendChild(document.body, this.tooltipElement);

    const tailwindClasses = [
      'hidden',
      'md:block',
      'absolute',
      'border',
      'text-xs',
      'capitalize',
      'bg-input/80',
      'text-foreground',
      'backdrop-blur-sm',
      'mt-2',
      'px-2',
      'py-1',
      'leading-none',
      'rounded-md',
      'whitespace-nowrap',
      'z-50',
    ];
    tailwindClasses.forEach(className => this.renderer.addClass(this.tooltipElement, className));

    this.updateTooltipPosition();
  }

  private updateTooltipPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();
    const top = hostPos.bottom + window.scrollY;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2 + window.scrollX;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null!;
    }
  }
}
