import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rotas';

  showMenu:boolean = false;

  constructor(private autService: AuthService) {

  }

  ngOnInit() {
    if(this.autService.showMenuEmitter.on('true')) {

    }
  }
}
