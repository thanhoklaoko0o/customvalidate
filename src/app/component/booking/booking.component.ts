import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export function EmailValidator(confirmEmailInput: string) {
  let confirmEmailControl: FormControl;
  let emailControl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    if (!confirmEmailControl) {
      confirmEmailControl = control;
      emailControl = control.parent.get(confirmEmailInput) as FormControl;
      emailControl.valueChanges.subscribe(() => {
        confirmEmailControl.updateValueAndValidity();
      });
    }

    if (
      emailControl.value.toLocaleLowerCase() !==
      confirmEmailControl.value.toLocaleLowerCase()
    ) {
      return {
        notMatch: true
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  formPayment: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createFormPayment();
  }

  createFormPayment() {
    this.formPayment = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required, EmailValidator('email')],
      phone: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      country: ['', Validators.required],
      expirate: ['', Validators.pattern('/^[0][1-9]|[1][0-2]-[0-9]{2}$/')]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formPayment.controls; }

  onSubmitForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formPayment.invalid) {
      console.log('invalid validate');
      return;
    }
    // submit thanh cong
    console.log(this.formPayment.value);
  }

}
