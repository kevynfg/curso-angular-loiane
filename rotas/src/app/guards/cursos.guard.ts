import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

// class UserToken {}
// class Permissions {
//   canActivate(user: UserToken, id: string): boolean {
//     return true;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class CursosGuard implements CanActivateChild  {
 
  constructor() {}

  canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      console.log('guarda de rota filha')
      return true;
    }
}
