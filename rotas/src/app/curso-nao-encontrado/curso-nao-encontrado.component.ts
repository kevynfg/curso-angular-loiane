import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-nao-encontrado',
  templateUrl: './curso-nao-encontrado.component.html',
  styleUrls: ['./curso-nao-encontrado.component.css']
})
export class CursoNaoEncontradoComponent implements OnInit {

  id: number = 0;
  inscricao: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      setTimeout(() => {
        this.router.navigate([''])
      }, 5000);
    
  }

}
