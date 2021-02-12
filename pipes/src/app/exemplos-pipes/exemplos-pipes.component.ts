import { Component, Input, OnInit } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import {map, take} from 'rxjs/operators'
@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd edition',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  }

  livros: string[] = [
    'Angular 2', 'JavaScript', 'C#'
  ]

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve ('Valor assíncrono'), 2000);
  }) 

  //Observables
  valorAsync2:any = interval(1000).pipe(map((item) => `Hello ${item}`))
  

  @Input('ngModel') filter:string = ''

  //Pipe
  obterCursos(){
    if(this.livros.length === 0 || this.filter === undefined ||
      this.filter.trim() === '') {
        return this.livros
      }
      return this.livros.filter((item:any) => {
      if(item.toLowerCase().indexOf(this.filter.toLowerCase()) != -1) {
        return true;
      }
      return false
    })
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.livros)
  }

  addCurso(value:string) {
    this.livros.push(value)
  }

}
