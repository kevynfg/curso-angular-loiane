import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { TemplateFormComponent } from './template-form.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErrorComponent } from '../campo-control-error/campo-control-error.component';



@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoControlErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class TemplateFormModule { }
