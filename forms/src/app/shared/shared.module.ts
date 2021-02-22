import { BaseFormComponent } from './base-form/base-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { DropdownService } from './services/dropdown.service';
import { ConsultaCepService } from './services/consulta-cep.service';
import { InputFieldComponent } from './input-field/input-field.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErrorComponent,
    InputFieldComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErrorComponent,
    InputFieldComponent
  ],
  providers: [DropdownService, ConsultaCepService],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA,
  //   NO_ERRORS_SCHEMA
  // ]
})
export class SharedModule { }
