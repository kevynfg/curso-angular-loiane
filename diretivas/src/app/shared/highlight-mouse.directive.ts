import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'red')
    this.backgroundColor = 'yellow'
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'white')
    this.backgroundColor = 'white'
  }

  @HostBinding('style.backgroundColor') backgroundColor: string

  //Método do TypeScript
  // @HostBinding('style.backgroundCOlor') get setColor() {
  //   return this.backgroundColor;
  // }
   // Necessita que crie uma variável
  // private backgroundColor: string
  
  constructor() { }

}
