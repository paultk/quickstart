/**
 * Created by axelkvistad on 27/01/17.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {NavigationComponent} from "./navigation/navigation.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AuthGuard} from "./_guards/auth.guard";
import {PageNotFoundComponent} from "./not-found.component";

const appRoutes: Routes = [
  { path: '', component: NavigationComponent, canActivate: [AuthGuard], outlet: 'navigation-outlet'}, // (Axel, 27.01) todo: may be removed later
  { path: 'login',  component: LoginComponent },
//  { path: 'navigation', component: NavigationComponent },
  //{ path: 'calendar', component: CalendarComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
