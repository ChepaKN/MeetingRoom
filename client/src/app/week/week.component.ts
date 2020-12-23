import { Component, OnInit } from '@angular/core';
import {DayDTO} from '../day/day-dto';
import {repeatWhen} from 'rxjs/operators';
import {MeetingEntity} from '../meeting/meeting-entity';
import {Subscription} from 'rxjs';
import {BackendService} from '../service/backend.service';
import {DbQueryDTO} from '../service/db-query-dto';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  private msInDay = 86400000;
  private msInWeek = this.msInDay * 7;
  private workWeekLength = 6;
  weekDays: DayDTO[];
  weekDaysName = ['Понедельник', 'Вторник', 'Среда', 'Черверг', 'Пятница', 'Суббота'];

  meetings: MeetingEntity[];
  getMeetingsSubscription: Subscription;
  queryDTO: DbQueryDTO;

  constructor(private backend: BackendService){}

  fillWeekDaysDates(): void{

    const currentDayNum = new Date().getDay();
    let mondayDate: Date;
    const currentDateStart = new Date().setHours(0, 0, 0, 0);
    if (currentDayNum === 0) {
      // if sunday
      mondayDate = new Date(currentDateStart - this.workWeekLength * this.msInDay);
    }else{
      mondayDate = new Date(currentDateStart - (currentDayNum - 1) * this.msInDay);
    }
    this.weekDays = [{
      date: mondayDate,
      dayName: this.weekDaysName[0]
    }];
    this.fillDaysExceptMonday();
  }

  ngOnInit(): void {

    this.fillWeekDaysDates();

    this.queryDTO = {
      startOfWeek: this.weekDays[0].date.valueOf(),
      endOfWeek: this.weekDays[0].date.valueOf() + 6 * this.msInDay - 1,
    };

    this.getMeetingsSubscription = this.backend
      .getMeetingsByWeek(this.queryDTO)
      .pipe(repeatWhen(() => this.backend.refreshMeetings))
      .subscribe((meetings: MeetingEntity[]) => {
        this.meetings = meetings;
        if (this.meetings != null){
          this.sortMeetings();
        }
      });
  }

  sortMeetings(): void{
    this.meetings.sort((a, b) =>
      a.date - b.date);
  }

  prevClick(): void {
    const newMondayDate = new Date(this.weekDays[0].date.valueOf() - this.msInWeek);
    this.weekDays = [{
      date: newMondayDate,
      dayName: this.weekDaysName[0]
    }];
    this.fillDaysExceptMonday();
  }

  nextClick(): void {
    const newMondayDate = new Date(this.weekDays[0].date.valueOf() + this.msInWeek);
    this.weekDays = [{
      date: newMondayDate,
      dayName: this.weekDaysName[0]
    }];
    this.fillDaysExceptMonday();
  }

  private fillDaysExceptMonday(): void{
    for (let i = 1; i < this.workWeekLength; i++){
      const nextDayDate = new Date(this.weekDays[i - 1].date.valueOf() + this.msInDay);
      this.weekDays.push({date: nextDayDate, dayName: this.weekDaysName[i]});
    }
  }

  belongsToDay(date1: number, date2: number): boolean{
    return (((date1 - date2) < this.msInDay) && ((date1 - date2) >= 0));
  }

  showInfo(meet: MeetingEntity): void {
    console.log(meet.date + meet.initiator + meet.estimatedTime);
  }
}
