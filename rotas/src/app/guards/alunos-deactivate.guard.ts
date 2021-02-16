import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AlunoFormularioComponent } from '../alunos/aluno-formulario/aluno-formulario.component';

@Injectable({
  providedIn: 'root'
})
export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormularioComponent> {
  canDeactivate(
    component: AlunoFormularioComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Guarda de desativação') 
      return component.canChangeRoute();
  }
  
}
