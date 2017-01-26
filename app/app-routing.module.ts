import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import {NavigationComponent} from "./navigation.component";
import {CalendarComponent} from "./calendar.component";

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'calendar', component: CalendarComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
