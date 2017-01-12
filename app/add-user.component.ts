import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
moduleId: module.id,
  selector: 'my-add-user',

  // template: '<h1>right components</h1>'

  templateUrl: 'add-user.component.html',
  // styleUrls: [ 'add-user.component.css'],
})
export class AddUserComponent {
  constructor(
    public formBuilder: FormBuilder) {}


  public userForm = this
    .formBuilder
    .group({
      fornavn: ["", Validators.required],
      etternavn: ["", Validators.required],
      adresse: ["", Validators.required],
      postkode: ["", Validators.required],
      by: ["", Validators.required],
      epost: ["", Validators.required],
      telefonNr: ["", Validators.required],
      fodseldato: ["", Validators.required],
      stilling: ["", Validators.required],
      stillingsProsent: ["", Validators.required],
  })
}
