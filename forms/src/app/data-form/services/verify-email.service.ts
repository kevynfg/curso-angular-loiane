import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(private http: HttpClient) { }

  verifyEmail(email: string){
    return this.http.get('assets/dados/verifyEmail.json')
    .pipe(
      delay(2000),
      map((dados: any) => dados.emails),
      // tap(console.log),
      map((dados: {email: string}[]) => dados.filter((item) => item.email === email)),
      // tap(console.log),
      map((dados: any[]) => dados.length > 0),
      // tap(console.log)
      )
  }
}
