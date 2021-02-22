import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
    return this.http.get('assets/dados/states.json')
    .toPromise();
  }

  getNewsLetter(): any{
    return [
      {value: 's', desc: 'Sim'},
      {value: 'n', desc: 'Não'}
    ]
  }
}
