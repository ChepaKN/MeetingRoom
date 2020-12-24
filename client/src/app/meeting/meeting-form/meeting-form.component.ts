import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateValidator} from "../../validators/date-validator";
import {MeetingEntity} from "../meeting-entity";
import {BackendService} from "../../service/backend.service";

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit, OnDestroy {

  meetingForm: FormGroup;
  dateValidator = new DateValidator();

  constructor(private backend: BackendService) {
    this.meetingForm = new FormGroup({
      meetingDate: new FormControl('', [Validators.required, this.dateValidator.validateDate]),
      initiator: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      estimatedTime: new FormControl('', [Validators.required, Validators.min(30), Validators.max(24 * 3600)]),
    });
  }

  ngOnInit(): void {
  }

  addMeetingEvent(): void {
    if (this.meetingForm.invalid){
      console.error(this.meetingForm.get('eventDate').getError('invalidDate'));
      return;
    }

    const value = this.meetingForm.value;
    const date = new Date(value.meetingDate).valueOf();
    const meeting = new MeetingEntity(1, date, value.initiator, value.estimatedTime);

    const postMeetingsSubscription = this.backend.putMeeting(meeting)
      .subscribe((resp) => {
        if (resp.status === 208){
          alert('Выбранное время занято.');
        }
        this.backend.refreshMeetingsData();
        postMeetingsSubscription.unsubscribe();
      });
  }

  ngOnDestroy(): void {
  }

  clearMeetings(): void {
    const deleteAllMeetingsSubscription = this.backend.deleteAllMeetings()
      .subscribe(() => {
        this.backend.refreshMeetingsData();
        deleteAllMeetingsSubscription.unsubscribe();
      });
  }
}
