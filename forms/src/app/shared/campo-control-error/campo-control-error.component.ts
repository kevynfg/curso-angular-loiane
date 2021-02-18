import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campo-control-error',
  templateUrl: './campo-control-error.component.html',
  styleUrls: ['./campo-control-error.component.css']
})
export class CampoControlErrorComponent implements OnInit {

  @Input() showError: boolean | any = false;
  @Input() errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
