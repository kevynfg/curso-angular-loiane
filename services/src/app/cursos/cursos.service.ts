import { Injectable } from "@angular/core"

@Injectable()
export class CursosService {
  private _cursos: string[] = ['Angular 2', 'JavaScript', '.NET', 'Java']
  constructor() {}
  getCursos() {
    return this._cursos
  }
  addCursos(curso: string) {
    if(curso){
      let newCurso = curso
      this._cursos.push(newCurso)
    } else {
      throw new Error('Digite algum curso.')
    }
  }
}