import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.css']
})
export class DiretivasCustomizadasComponent implements OnInit {
  
  mostrarCursos: boolean = false;
  mostrarMsg: boolean = false;

  constructor() {
   }
  ngOnInit(): void {
  }

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos
  }

  onMostrarMsg(){
    this.mostrarMsg = !this.mostrarMsg
  }


}
