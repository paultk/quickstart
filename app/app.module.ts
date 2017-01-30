// import "./rxjs-extensions";

import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {NavigationComponent} from "./navigation/navigation.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {UserinfoComponent} from "./userinfo/userinfo.component";
import {ProfilComponent} from "./profil/profil.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {InputFieldComponent} from "./input-field/input-field.component";
import {ForgotCredentialsComponent} from "./forgot-credentials/forgot-credentials.component";
import {FravaerComponent} from "./fravaer/fravaer.component";
import {FaqComponent} from "./faq/faq.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {NavBarComponent} from "./calendar/nav-bar.component";
import {NotificationComponent} from "./notification/notification.component";
import {UserSearchcomponent} from "./userinfo/user-search.component";
import {UserService} from "./_services/user.service";
import {FravaerService} from "./_services/fravaer.service";
import {ShiftService} from "./_services/shift.service";
import {AvdelingService} from "./_services/avdeling.service";
import {NotificationService} from "./_services/notification.service";
import {AuthenticationService} from "./_services/authentication.service";
import {FravaerInfoComponent} from "./fravaer-info/fravaer-info.component";
import {UsersCalendarComponent} from "./calendar/calendar_for_user/users-calendar.component";
import {AdminCalendarComponent} from "./calendar/calendar_for_admin/admin-calendar.component";
import {VaktBytteComponent} from "./vakt_bytte/vakt-bytte.component";
@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    UserinfoComponent,
    ProfilComponent,
    UserFormComponent,
    InputFieldComponent,
    ForgotCredentialsComponent,
    FravaerComponent,
    FaqComponent,
    CalendarComponent,
    NavBarComponent,
    FaqComponent,
    NotificationComponent,
    UserSearchcomponent,
    FravaerInfoComponent,
    UsersCalendarComponent,
    AdminCalendarComponent,
    VaktBytteComponent
  ],
  providers: [
    UserService,
    FravaerService,
    ShiftService,
    AvdelingService,
    NotificationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

