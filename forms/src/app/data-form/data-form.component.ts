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
}
