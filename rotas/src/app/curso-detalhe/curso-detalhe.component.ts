import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id:number = 0
  inscricao: Subscription = new Subscription() 
  curso: any;

  constructor(
    private route: ActivatedRoute,
     private cursoService: CursosService,
      private router: Router) {
    // this.id = route.params
    // console.log(this.id)
   }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params['id']

      //pega o curso com o id selecionado
      this.curso = this.cursoService.getCurso(this.id)
      
      if(this.curso == null) {
        this.router.navigate(['/naoEncontrado'])
      }
    })
    console.log(this.inscricao)
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
