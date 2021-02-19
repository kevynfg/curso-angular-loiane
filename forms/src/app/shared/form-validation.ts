import { FormArray, FormControl, ValidatorFn, FormGroup } from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1): ValidatorFn {
    const validator: any = (formArray: FormArray): any => {
      // const values = formArray.controls;
      // let totalChecked = 0;
      // for (const item of values) {
      //   if (item.value) {
      //     totalChecked += 1;
      //   }
      // }
      const totalChecked = formArray.controls
      .map((v: any) => v.value)
      .reduce((prev: any, current: any) => {
        console.log('total', prev, 'current: ', current);
        return current ? prev + current : prev;
      }, 0);
      return totalChecked >= min ? null : {required: true};
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
     const cep = control.value;
     if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : {cepInvalido: true};
     }
    return null;
  }

  static equalsTo(otherField: string): any {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informa um campo.')
      }

      if (!formControl.root || !(formControl.root as FormGroup).controls){
        return null;
      }

      const field = (formControl.root as FormGroup).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField};
      }
      return null;
    };
    return validator;
  }
}
