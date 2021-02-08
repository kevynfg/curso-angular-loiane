import { Component } from "@angular/core";

const number = 2

@Component({
  selector: 'meu-primeiro-component',
  template: `
    <p>Meu primeiro component com Angular ${number}</p>
  `
})  
export class MeuPrimeiroComponent {

}