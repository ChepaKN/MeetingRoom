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
export class DayComponent implements OnInit {

  @Input()
  day: DayDTO;

  meetingList: MeetingEntity[];

  constructor() {
  }

  ngOnInit(): void {
  }


}
