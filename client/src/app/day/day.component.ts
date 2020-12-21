import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DayDTO} from './day-dto';
import {BackendService} from '../service/backend.service';
import {repeatWhen} from 'rxjs/operators';
import {MeetingEntity} from '../meeting/meeting-entity';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, OnDestroy {


  @Input()
  day: DayDTO;

  // refreshMeetings = new Subject();
  getMeetingsSubscription: Subscription;
  meetingList: MeetingEntity[];

  constructor(private backend: BackendService) {
  }


  ngOnInit(): void {
    this.getMeetingsSubscription = this.backend
      .getMeetings()
      .pipe(repeatWhen(() => this.backend.refreshMeetings))
      .subscribe((meetings: MeetingEntity[]) => {
        this.meetingList = meetings;
        if (this.meetingList != null){
          this.sortMeetings();
        }
      });
  }

  sortMeetings(){
    this.meetingList.sort((a, b) =>
      a.date - b.date);
  }

  ngOnDestroy(): void {
    this.getMeetingsSubscription.unsubscribe();
  }

}
