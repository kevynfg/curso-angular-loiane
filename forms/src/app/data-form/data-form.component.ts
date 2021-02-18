import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  useformGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient ) { }

  ngOnInit(): void {
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
      })
    })
  }

  onSubmit() {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.useformGroup.value))
      .subscribe(dados => {
        console.log(dados);
        //reseta o form
        this.reset();
      }, (error) => {
        alert('Deu ruim!!')
        console.log(error)
      });
    }

  reset() {
    this.useformGroup.reset()
  }  

  applyCssError(element: string) {
    return {
      'has-error': this.verifyValidTouched(element),
      'has-feedback': this.verifyValidTouched(element)
    };
  }

  verifyValidTouched(element:string) {
    return this.useformGroup.get(element)?.valid && this.useformGroup.get(element)?.touched;
  }

  verifyInvalidEmail(){
    let emailElement = this.useformGroup.get('email')
    if(emailElement?.errors){
      return emailElement.errors['email'] && emailElement.touched
    }
  }

  findCEP() {
    // Nova variável "cep" somente com dígitos.
    let cep = this.useformGroup.get('endereco.cep')?.value;

    console.log('cep', cep)
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      
      if(validacep.test(cep)) {
        this.resetDataForm();
        return this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .subscribe((data: any) => this.fillDataFields(data));
      }
    }
    return null
  }

  fillDataFields(data:any){
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

    this.useformGroup.get('name')?.setValue('Kevyn')

  }

  resetDataForm() {
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
}
