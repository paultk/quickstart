import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import {AppComponent}  from './app.component';
import {AnsattinfoComponent} from "./ansattinfo.component";
import {ProfilComponent} from "./profil.component";
import {LoginComponent} from './login.component';
import {UserFormComponent} from './user-form.component';
import {UserService} from "./user.service";
import {InputFieldComponent} from "./input-field.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AnsattinfoComponent,
    ProfilComponent,
    UserFormComponent,
    InputFieldComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
