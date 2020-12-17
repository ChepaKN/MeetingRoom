import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateValidator} from "../../validators/date-validator";
import {MeetingEntity} from "../meeting-entity";
import {BackendService} from "../../service/backend.service";
import {Subject, Subscription} from "rxjs";
import {map, repeatWhen} from "rxjs/operators";
import {LocalNgModuleData} from "@angular/compiler-cli/src/ngtsc/scope";

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit, OnDestroy {

  meetingForm: FormGroup;
  dateValidator = new DateValidator();
  meetings: MeetingEntity[];
  refreshMeetings = new Subject();
  getMeetingsSubscription: Subscription;

  constructor(private backend: BackendService) {
    this.meetingForm = new FormGroup({
      meetingDate: new FormControl('', [Validators.required, this.dateValidator.validateDate]),
      initiator: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      estimatedTime: new FormControl('', [Validators.required, Validators.min(30), Validators.max(24*3600)]),
    })
  }

  ngOnInit(): void {
    this.getMeetingsSubscription = this.backend
      .getMeetings()
      .pipe(repeatWhen(() => this.refreshMeetings))
      .subscribe((meetings: MeetingEntity[]) => {
        this.meetings = meetings;
        this.sortMeetings();
      })
  }

  addMeetingEvent() {
    if(this.meetingForm.invalid){
      console.error(this.meetingForm.get('eventDate').getError('invalidDate'))
      return
    }

    const value = this.meetingForm.value;
    const meeting = new MeetingEntity(1, value.meetingDate, value.initiator, value.estimatedTime);

    const postMeetingsSubscription = this.backend.putMeeting(meeting)
      .subscribe(() => {
        this.refreshMeetings.next();
        postMeetingsSubscription.unsubscribe();
      });
  }

  sortMeetings(){
    this.meetings.sort((a, b) =>
      new Date(a.date.toString()).valueOf()  - new Date(b.date.toString()).valueOf())
  }

  logAllMeetings() {
    this.sortMeetings();
    this.meetings.forEach(value => console.log(value.date.valueOf()))
  }

  ngOnDestroy(): void {
    this.getMeetingsSubscription.unsubscribe();
  }

  clearMeetings() {
    const deleteAllMeetingsSubscription = this.backend.deleteAllMeetings()
      .subscribe(() => {
        this.refreshMeetings.next();
        deleteAllMeetingsSubscription.unsubscribe();
      });
  }
}
