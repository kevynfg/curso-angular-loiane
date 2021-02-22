import { City } from './../shared/models/cities';
import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { Component, OnInit, NO_ERRORS_SCHEMA, Pipe } from '@angular/core';

import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { VerifyEmailService } from './services/verify-email.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { empty, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validation';
import { StatesBr } from '../shared/models/states';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  // useformGroup!: FormGroup;
  states!: Observable<StatesBr[]>;
  cities!: City[];
  roles!: any[];
  technologies!: any[];
  newsletterOption!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Svelt'];

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService,
              private verifyEmailService: VerifyEmailService) {
                super();
               }
  ngOnInit(): void {

    // this.verifyEmailService.verifyEmail('email@email.com').subscribe();

    // this.states = this.dropdownService.getBrazilStates();
    this.dropdownService.getBrazilStates().subscribe((dados: any) => this.states = dados);
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
          Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email], [this.validateEmail.bind(this)]],
      confirmEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required, FormValidations.cepValidator],
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

    this.useformGroup.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ? this.cepService.findCEP(this.useformGroup.get('endereco.cep')?.value) : empty())
      )
    .subscribe(value => value ? this.fillDataFields(value) : {});

    this.useformGroup.get('endereco.estado')?.valueChanges
    .pipe(
      switchMap(sigla => this.states.pipe(
        map(estados => estados.filter(estado => estado.sigla === sigla)),
        map(estados => estados[0].id),
        switchMap(id => this.dropdownService.getCities(id).pipe(
          map((cidades: City[]) => this.cities = cidades)
        ))
      ))
    )
    .subscribe();
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(2) as ValidatorFn ) ;

    // Método abaixo não é dinâmico
    // return [
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    // ];
  }

  submit() {
    let valueSubmit = Object.assign({}, this.useformGroup.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((value: any, index: any) => value ? this.frameworks[index] : null)
      .filter((value: any) => value !== null)
    });
    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form
        this.reset();
      }, (error) => {
        alert('Deu ruim!!');
        console.log(error);
      });

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
      .then((dados: any) => this.fillDataFields(dados));
    }

    this.dropdownService.getCities(8).subscribe(console.log)
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

  validateEmail(formControl: FormControl) {
    return this.verifyEmailService.verifyEmail(formControl.value)
      .pipe(map((emailExists) => emailExists ? {emailInvalido: true} : null))
  }

}
