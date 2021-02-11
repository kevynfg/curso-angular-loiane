import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {Subscription} from 'rxjs'

import {CursosService} from './cursos.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];

  constructor(private cursosService: CursosService) {
    // this.cursosService = new CursosService();
    // this.cursosService = cursosService;
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
    CursosService.criouNovoCurso.subscribe(
      (curso) => {
        this.cursos.push(curso)
      })
  }

 
}
