import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateValidator} from "../../validators/date-validator";
import {MeetingEntity} from "../meeting-entity";
import {BackendService} from "../../service/backend.service";
import {Subject, Subscription} from "rxjs";
import {repeatWhen} from "rxjs/operators";

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

  postMeetingsSubscription: Subscription;
  getMeetingsSubscription: Subscription;

  constructor(private backend: BackendService) {
    this.meetingForm = new FormGroup({
      meetingDate: new FormControl('', [Validators.required, this.dateValidator.validateDate]),
      initiator: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      estimatedTime: new FormControl('', [Validators.required, Validators.max(120)]),
    })
  }

  ngOnInit(): void {
    this.getMeetingsSubscription = this.backend
      .getMeetings()
      .pipe(repeatWhen(() => this.refreshMeetings))
      .subscribe(((meetings: MeetingEntity[]) => this.meetings = meetings))
  }

  addMeetingEvent() {
    if(this.meetingForm.invalid){
      console.error(this.meetingForm.get('eventDate').getError('invalidDate'))
      return
    }

    const value = this.meetingForm.value;
    const meeting = new MeetingEntity(1, new Date(value.meetingDate), value.initiator, value.estimatedTime);

    this.postMeetingsSubscription = this.backend.putMeeting(meeting)
      .subscribe(() => this.refreshMeetings.next());

  }

  logAllMeetings() {
    this.meetings.forEach(m => console.log(m))
  }

  ngOnDestroy(): void {
    this.postMeetingsSubscription.unsubscribe();
    this.getMeetingsSubscription.unsubscribe();
  }
}
