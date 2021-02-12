import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let values = value.split(' ');
    let result = '';
    for(let v of values) {
      console.log(result)
      result += this.capitalize(v) + ' ';
    }
    return result;
  }

  capitalize(value:string) {
    return value.substr(0,1).toUpperCase() +
    value.substr(1).toLowerCase();
  }

  randomCapitalize(value:string){
    let word = ''
    let j = 2
    let k = 0
    for(let i = 1; i<value.length;i++) {
      word = value.substr(k,i).toUpperCase() +
      value.substr(j).toLowerCase();
      j++;
      k++
    }
    return word
  }

}
