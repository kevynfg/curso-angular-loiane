import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  user: any = {
    nome: null,
    email: null
  };

  onSubmit(formulario: { value: any; form: 
    { reset: () => void; 
    } }) {
    console.log(formulario);

    // form.value
    // console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  verifyValidTouched(campo:any) {
    return !campo.valid && campo.touched;
  }

  applyCssError(campo: any) {
    return {
      'has-error': this.verifyValidTouched(campo),
      'has-feedback': this.verifyValidTouched(campo)
    };
  }

  findCEP(cep:any, form:any) {
    // Nova variável "cep" somente com dígitos.
    let newCep = cep.target.value
    console.log('cep', newCep)
    newCep = newCep.replace(/\D/g, '');

    if (newCep !== '') {
      const validacep = /^[0-9]{8}$/;
      
      if(validacep.test(newCep)) {
        this.resetDataForm(form);
        return this.http.get(`//viacep.com.br/ws/${newCep}/json`)
        .subscribe((dados: any) => this.fillDataFields(dados, form));
      }
    }
    return null
  }

  fillDataFields(dados:any, formulario:any) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    console.log('formulario', formulario);
  }

  resetDataForm(formulario:any) {
    formulario.form.patchValue({
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