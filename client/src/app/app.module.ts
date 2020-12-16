import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MeetingFormComponent } from './meeting/meeting-form/meeting-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormErrorComponent} from "./form-error/form-error.component";
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./service/backend.service";
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingFormComponent,
    FormErrorComponent,
    MeetingListComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
