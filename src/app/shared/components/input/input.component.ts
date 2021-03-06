import { Component, OnInit, AfterContentInit, Input, ContentChild } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label !: string;
  @Input() errorMessage !: string;
  @Input() showTip = true;

  input: any;

  @ContentChild(NgModel, { static: false }) model !: NgModel;

  @ContentChild(FormControlName, { static: false }) control !: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
    }
  }

  hasSuccess() {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError() {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

  inputDirty(): boolean {
    let response = false;

    if ( (this.model && this.model.value.length > 0) || (this.control && this.control.value.length > 0)) {
      response = true;
    } else {
      response = false;
    }

    return response;
  }

}
