import { Component, Input, OnInit, Output, AfterContentChecked, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit, AfterContentChecked, OnDestroy, OnChanges {
  @Input() inputNumber: string = ''

  firstValueSaved: number = 0
  secondValueSaved: number = 0

  displayNumbers(value: any) {
    this.inputNumber += value
  }

  firstSavedValue(value: string) {
    this.firstValueSaved = Number(value)
  }

  secondSavedValue(value: string) {
    this.secondValueSaved = Number(value)
  }

  minusOperation() {
    this.inputNumber = this.inputNumber + ' - '
    // return this.firstValueSaved - this.secondValueSaved
  }

  plusOperation() {
    this.inputNumber = this.inputNumber + ' + '
    // return this.firstValueSaved + this.secondValueSaved
  }

  sumValues() {
    if(this.inputNumber.includes('-')) {
      const newValue = this.inputNumber.replace(/-/g, '')
      const sumValue:any[] = newValue.split(' ').filter(item => item)
      const result = sumValue[0] - sumValue[1]
      this.inputNumber = String(result)
      console.log(this.inputNumber)
    } else {

      //TROCAR ISTO POR UM REDUCE OU SUM()
      const newValue = this.inputNumber.replace(/\+/g, '')
      const sumValue:any[] = newValue.split(' ').filter((item => item))
      const result = Number(sumValue[0]) + Number(sumValue[1])
      console.log(sumValue)
      this.inputNumber = String(result)
      console.log(this.inputNumber)
    }
  }

  clearValues() {
    this.inputNumber = ''
  }

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterContentChecked() {
  
  }

  ngOnDestroy() {
  }

  ngOnChanges() {
    
  }
}
