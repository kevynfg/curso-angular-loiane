import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valor: number = 5;
  deletarCiclo: boolean = false
  calculadoraValueInput: number = 0

  mudarValor(){
    this.valor++
  }

  destruirCiclo(){
    this.deletarCiclo = true
  }
}
