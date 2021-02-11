import { Injectable, Output, EventEmitter } from "@angular/core"
import {BehaviorSubject} from 'rxjs'
@Injectable()
export class CursosService {

  emitirCursoCriado = new EventEmitter<string>()
  static criouNovoCurso = new EventEmitter<string>()
  // emitirCursoCriado = new EventEmitter()
  currentMessage = this.emitirCursoCriado.asObservable()
  private _cursos: string[] = ['Angular 2', 'JavaScript', '.NET', 'Java']
  
  constructor() {
    console.log('CursosService instanciada')
  }
  getCursos() {
    return this._cursos
  }
  addCursos(curso: string) {
    if(curso){
      this._cursos.push(curso)
      this.emitirCursoCriado.emit(curso)
      CursosService.criouNovoCurso.emit(curso)
    } else {
      throw new Error('Digite algum curso.')
    }
  }
}