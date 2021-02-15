import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { Observable, Subscriber } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth: boolean = false;
  @Output() showMenuEmitter = new EventEmitter()


  constructor(private router: Router,) { }

  userLogIn(user: User) {
    if(user.name == 'user@email.com' &&
    user.password == '123456') {
      this.userAuth = true;

      this.showMenuEmitter.emit({mostrar: 'mudou'})

      this.router.navigate(['/cursos'])
    } else {
      this.userAuth = false;
      this.router.navigate(['/'])
    }
  }
}
