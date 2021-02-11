import { Component, OnInit } from '@angular/core';
//Imports para aplicação
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css'],
  providers: [CursosService]
})
export class CriarCursoComponent implements OnInit {

  cursos: string[] = [];
  

  constructor(private cursoService: CursosService) { }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }
  salvarCurso(value: string) {
    this.cursoService.addCursos(value)
    console.log(this.cursos)
  }

}
