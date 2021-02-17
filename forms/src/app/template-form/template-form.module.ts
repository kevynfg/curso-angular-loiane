import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { TemplateFormComponent } from './template-form.component';



@NgModule({
  declarations: [
    TemplateFormComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class TemplateFormModule { }
