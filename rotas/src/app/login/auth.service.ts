import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth: boolean = false;
  showMenuEmitter = new EventEmitter(false)
  private Users:any[] = [
    {name: 'Kevyn', password: '123456'},
    {name: 'Mary', password: '123456'}
  ] 

  constructor(private router: Router,
    ) { }

  userLogIn(user: User) {
      let logged = false
      if(user) {
        for(let usuario of this.Users) {
          if(usuario.name == user.name) {
            console.log('Usuário logado: ', usuario.name)
            logged = true;
          }
        }
      }
      if(logged) {
      this.userAuth = true;

      this.showMenuEmitter.emit(true)

      this.router.navigate(['/home'])
    } else {
      this.userAuth = false;
      this.router.navigate(['/'])
    }
  }

  userAuthenticated() {
    return this.userAuth
  }
}
