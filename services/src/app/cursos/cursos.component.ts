import { Component, OnInit, Input, ElementRef } from '@angular/core';

import {CursosService} from './cursos.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];
  // cursosService: CursosService;
  novoCurso: string = ''
  testeString: string = ''
  constructor(private cursosService: CursosService) {
    // this.cursosService = new CursosService();
    // this.cursosService = cursosService;
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }

  salvarCurso(value: string) {
    this.novoCurso = value
    this.cursosService.addCursos(this.novoCurso)
    console.log(this.cursos)
  }
}
