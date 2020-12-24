import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MeetingFormComponent } from './meeting/meeting-form/meeting-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormErrorComponent} from "./form-error/form-error.component";
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./service/backend.service";
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import {AuthorizationService} from './service/authorization.service';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: WeekComponent,
}, {
  path: 'addMeeting',
  component: MeetingFormComponent
},
  {
    path: 'authorization',
    pathMatch: 'full',
    component: AuthorizationFormComponent,
}];

@NgModule({
  declarations: [
    AppComponent,
    MeetingFormComponent,
    FormErrorComponent,
    WeekComponent,
    DayComponent,
    AuthorizationFormComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
  providers: [BackendService, AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
