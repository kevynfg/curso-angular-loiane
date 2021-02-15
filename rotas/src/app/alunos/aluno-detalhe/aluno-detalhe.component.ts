import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  aluno: any;
  inscricao: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunosService
  ) 
  { 

  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params:any) => {
      let id = params['id'];

      this.aluno = this.alunoService.getAluno(id);
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
