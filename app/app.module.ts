import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AddUserComponent } from './add-user.component';
import { LoginComponent } from './login.component';
import { VaktlisteAdminComponent } from './vaktliste-admin.component'

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule

  ],
  declarations: [
    AppComponent,
    AddUserComponent,
    LoginComponent,
    VaktlisteAdminComponent
  ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
