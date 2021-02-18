import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

constructor(private http: HttpClient) { }

getBrazilStates(): Promise<object>{
    return this.http.get('assets/states.json')
    .toPromise();
  }
}
