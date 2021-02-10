import { Directive, HostBinding, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  // @HostListener('mouseover') onMouseOver() {
  //   // this._renderer.setStyle(this._elementRef, 'background-color', this.changeColor());
  //   this.backgroundColor = this.changeColor()
  // }

  // @HostBinding('style.backgroundColor') backgroundColor:any;

  @HostBinding('style.backgroundCOlor') get setColor() {
    return this.backgroundColor = this.changeColor();
  }
  private backgroundColor: string

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    // console.log(this._elementRef)
  //   this._elementRef
  //   .nativeElement
  //   .style
  //   .backgroundColor = 'yellow';
  //  }
  
  this._renderer.setStyle(this._elementRef.nativeElement,
     'background-color', 'yellow')
  }

  generateColor() {
    let color = '#'
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    color += randomColor
    console.log(color)
    return color
  }

  changeColor(): any {
    return this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', this.generateColor())
  }
}
