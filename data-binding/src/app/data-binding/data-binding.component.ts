import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
  // styles: [
  //   `
  //   .highlight {
  //   font-size: 30px;
  // }
  //   `
  // ]
})
export class DataBindingComponent implements OnInit {
 
  url: string = 'https://github.com/kevynfg';
  cursoAngular: boolean = false
  urlImagem: string = 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
  valorAtual: string = ''
  valorSalvo: string = ''
  isMouseOverOut: boolean = false

nomeDoCurso: string = 'Angular'

valorInicial = 15;

onMudouValor(evento: any) {
  console.log(evento.novoValor)
}

  salvarValor(value: string){
    this.valorSalvo = value;
    console.log(this.valorSalvo);
  }

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true
  }

  botaoClicado(){
    alert('Olá você clicou')
  }

  onMouseOverOut() {
    this.isMouseOverOut = !this.isMouseOverOut
  }

  onKeyUp(evento: KeyboardEvent) {
    this.valorAtual = (<HTMLInputElement> evento.target).value
  }

  constructor() { }

  ngOnInit(): void {
  }

}
