import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classCss!: any;
  @Input() id!: string;
  @Input() label!: string;
  @Input() type = 'text';
  @Input() control!: any;
  @Input() isReadOnly: boolean = false;

  private innerValue!: any;

  get value() {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.value = value;
      this.onChangeCallback(value);
    }
  }

  constructor() { }

  onChangeCallback: (_: any) => void = () => {

  }

  onTouchedCallback: (_: any) => void = () => {

  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.value = value;
      this.onChangeCallback(value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState(isDisabled?: boolean): void {
    this.isReadOnly = !!isDisabled;
  }

  ngOnInit(): void {
  }

}
