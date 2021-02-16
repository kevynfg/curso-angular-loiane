import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/forme-candeactivate';
import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-formulario',
  templateUrl: './aluno-formulario.component.html',
  styleUrls: ['./aluno-formulario.component.css']
})
export class AlunoFormularioComponent implements OnInit, IFormCanDeactivate {

  aluno: any;
  inscricao: Subscription = new Subscription()
  private formChanged: boolean = false;

  constructor(private route: ActivatedRoute,
    private alunosService: AlunosService) { }

  ngOnInit(): void {
    // this.inscricao = this.route.params.subscribe(
    //   (params) => {
    //     let id = params['id']
        
    //     this.aluno = this.alunosService.getAluno(id)
    //     if(this.aluno == null) {
    //       this.aluno = {};
    //     }
    // })

    this.inscricao = this.route.data.subscribe(
      (info) => {
        console.log('Recebendo obj de aluno em resolver')
        console.log('info', info)
        this.aluno = info.aluno;
      })
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput() {
    this.formChanged = true;
    console.log('mudou')
  }

  canChangeRoute() {
    if(this.formChanged) {
      confirm('Tem certeza que deseja sair dessa página?')
    }
    return true
  }

  canDeactivate() {
    return this.canChangeRoute()
  }


}
