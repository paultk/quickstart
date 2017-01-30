import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {NavigationComponent} from "./navigation/navigation.component";
import {VaktBytteComponent} from "./vakt_bytte/vakt-bytte.component";
import {AdminCalendarComponent} from "./calendar/calendar_for_admin/admin-calendar.component";
import {UsersCalendarComponent} from "./calendar/calendar_for_user/users-calendar.component";

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'calendar', component: UsersCalendarComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
