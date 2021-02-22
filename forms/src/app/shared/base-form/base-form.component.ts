import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  templateUrl: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  useformGroup!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit(): any;

  onSubmit() {
    if (this.useformGroup.valid) {
      this.submit();
    } else {
      console.log('did not submit');
      this.verifyFormValidations(this.useformGroup);
    }
  }

  verifyFormValidations(form: FormGroup | FormArray): void {
    Object.keys(form.controls)
      .forEach((formField) => {
        const control = form.get(formField);
        control?.markAsDirty();
        control?.markAsTouched();
        console.log('Dentro da raíz do form', control);
        if (control instanceof FormGroup || control instanceof FormArray) {
          // Essa recursividade é para percorrer todos os campos do form
          // até dentro de aninhamentos que tem um objeto dentro de outro objeto
          this.verifyFormValidations(control);
          console.log('Entrou em endereço', control);
        }
      });
  }

  reset(): void {
    this.useformGroup.reset();
  }

  verifyValidTouched(element: string): boolean | any {
    return this.useformGroup.get(element)?.valid &&
     this.useformGroup.get(element)?.touched ||
      this.useformGroup.get(element)?.dirty;
  }

  verifyRequired(element: string): boolean | any {
    return this.useformGroup.get(element)?.hasError('required') &&
     (this.useformGroup.get(element)?.touched ||
      this.useformGroup.get(element)?.dirty);
  }

  verifyInvalidEmail(): boolean | any{
    const emailElement = this.useformGroup.get('email');
    if (emailElement?.errors){
      return emailElement.errors['email'] && emailElement.touched;
    }
  }

  applyCssError(element: string): boolean | any {
    return {
      'has-error': this.verifyValidTouched(element),
      'has-feedback': this.verifyValidTouched(element)
    };
  }

  getField(field: string) {
    return this.useformGroup.get(field);
  }

}
