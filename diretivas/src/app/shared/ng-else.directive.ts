import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]'
})
export class NgElseDirective {

  //Toda vez que o método ngElse é modificado
  //o "set" é chamado e modificado o valor do template
  @Input() set ngElse(condition: boolean) {
    if(!condition){
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }

 

  constructor(
    private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef
  ) { }

}
