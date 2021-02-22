import { map } from 'rxjs/operators';
import { City } from './../models/cities';
import { StatesBr } from './../models/states';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

constructor(private http: HttpClient) { }

  getRoles(): Array<object> {
    return [
      {name: 'Dev', level: 'Junior', desc: 'Dev Jr'},
      {name: 'Dev', level: 'Pleno', desc: 'Dev Pl'},
      {name: 'Dev', level: 'Senior', desc: 'Dev Sr'}
    ];
  }

  getTechnologies(): Array<object> {
    return [
      {name: 'java', desc: 'Java'},
      {name: 'javascript', desc: 'JavaScript'},
      {name: 'php', desc: 'PHP'},
      {name: 'mongodb', desc: 'MongoDB'}
    ];
  }

  getBrazilStates(): any{
      return this.http.get<StatesBr[]>('assets/dados/states.json')
      .toPromise();
    }

  // tslint:disable-next-line: typedef
  getCities(idEstado: number) {
    return this.http.get<City[]>('assets/dados/cidades.json')
    .pipe(
      // tslint:disable-next-line: triple-equals
      map((cidades: City[]) => cidades.filter((item) => item.estado == idEstado))
    );
  }

  getNewsLetter(): any{
    return [
      {value: 's', desc: 'Sim'},
      {value: 'n', desc: 'Não'}
    ]
  }
}
