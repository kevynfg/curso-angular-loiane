import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { StatesBr } from '../shared/models/states';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  useformGroup!: FormGroup;
  states!: Observable<StatesBr[]>;
  roles!: any[];
  technologies!: any[];
  newsletterOption!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Svelt'];

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService) { }
  ngOnInit(): void {

    this.states = this.dropdownService.getBrazilStates();
    this.roles = this.dropdownService.getRoles();
    this.technologies = this.dropdownService.getTechnologies();
    this.newsletterOption = this.dropdownService.getNewsLetter();
    // this.dropdownService.getBrazilStates()
    // .then((item: any) => this.states = item);

    // this.formGroup = new FormGroup({
    //   name: new FormControl(null),
    //   password: new FormControl(null),
    // })

    this.useformGroup = this.formBuilder.group({
      name: [null,
        [Validators.required,
         Validators.minLength(3),
          Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      role: [null],
      technologies: [null],
      newsletter: ['s'],
      terms: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks(): any{
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);

    // Método abaixo não é dinâmico
    // return [
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    // ];
  }

  // tslint:disable-next-line:max-line-length
  onSubmit(): void {
    let valueSubmit = Object.assign({}, this.useformGroup.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((value: any, index: any) => value ? this.frameworks[index] : null)
      .filter((value: any) => value !== null)
    });

    console.log(valueSubmit);
    if (this.useformGroup.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form
        this.reset();
      }, (error) => {
        alert('Deu ruim!!');
        console.log(error);
      });
    } else {
      console.log('did not submit');
      this.verifyFormValidations(this.useformGroup);
    }
  }

  verifyFormValidations(form: FormGroup): void {
    Object.keys(form.controls)
      .forEach((formField) => {
        const control = form.get(formField);
        control?.markAsDirty();
        console.log('Dentro da raíz do form', control);
        if (control instanceof FormGroup) {
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

  applyCssError(element: string): boolean | any {
    return {
      'has-error': this.verifyValidTouched(element),
      'has-feedback': this.verifyValidTouched(element)
    };
  }

  verifyValidTouched(element: string): boolean | any {
    return this.useformGroup.get(element)?.valid &&
     this.useformGroup.get(element)?.touched ||
      this.useformGroup.get(element)?.dirty;
  }

  verifyInvalidEmail(): boolean | any{
    const emailElement = this.useformGroup.get('email');
    if (emailElement?.errors){
      return emailElement.errors['email'] && emailElement.touched;
    }
  }

  fillDataFields(data: any): any{
    this.useformGroup.patchValue({
      endereco: {
        rua: data.logradouro,
        // cep: dados.cep,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }
    });

    this.useformGroup.get('name')?.setValue('Kevyn');

  }

  findCEP(cep: any): any {
    // Nova variável "cep" somente com dígitos.
    cep = this.useformGroup.get('endereco.cep')?.value;

    if (cep !== '' && cep != null) {
      this.cepService.findCEP(cep)
      .subscribe((dados: any) => this.fillDataFields(dados))
    }
  }

  resetDataForm(): void {
    this.useformGroup.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setRole(): any {
    const role = {name: 'Dev', level: 'Junior', desc: 'Dev Jr'};
    this.useformGroup.get('role')?.setValue(role);
  }

  setTechnology(): any {
    this.useformGroup.get('technologies')?.setValue(['java', 'javascript', 'php']);
  }

  compareRoles(role1: any, role2: any): boolean | any{
    return role1 && role2 ? (role1.name === role2.name && role1.level === role2.level) : role1 === role2;
  }

}
