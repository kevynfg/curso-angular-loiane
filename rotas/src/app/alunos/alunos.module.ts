import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {AlunosComponent} from './alunos.component';
import { AlunoFormularioComponent } from './aluno-formulario/aluno-formulario.component'
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosService } from './alunos.service';

@NgModule({
  imports: [
    CommonModule,
    AlunosRoutingModule
  ],
  exports: [],
  declarations: [
    AlunosComponent,
    AlunoFormularioComponent,
    AlunoDetalheComponent
  ],
  providers: [AlunosService],
})
export class AlunosModule { }
