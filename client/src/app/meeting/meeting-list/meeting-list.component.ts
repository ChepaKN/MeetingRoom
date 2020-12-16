import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../service/backend.service";
import {MeetingEntity} from "../meeting-entity";
import {Subject, Subscription} from "rxjs";
import {repeatWhen} from "rxjs/operators";

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit, OnDestroy {

  constructor(private backend: BackendService) { }

  meetings: MeetingEntity[];
  getMeetingsSubscription: Subscription;
  refreshMeetings = new Subject();

  ngOnInit(): void {
    this.getMeetingsSubscription = this.backend
      .getMeetings()
      .pipe(repeatWhen(() => this.refreshMeetings))
      .subscribe(((meetings: MeetingEntity[]) => this.meetings = meetings))
  }

  logAllMeetings() {
      this.meetings.forEach(m => console.log(m))
  }

  ngOnDestroy(): void {
    this.getMeetingsSubscription.unsubscribe();
  }
}
