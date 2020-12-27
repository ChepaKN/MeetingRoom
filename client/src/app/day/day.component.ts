import {Component, Input, OnInit} from '@angular/core';
import {DayDTO} from '../dto/day-dto';
import {MeetingEntity} from '../meeting/meeting-entity';

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
