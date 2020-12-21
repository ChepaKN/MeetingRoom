import { Component, OnInit } from '@angular/core';
import {DayComponent} from '../day/day.component';
import {DayDTO} from '../day/day-dto';

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

  constructor(){}

  fillWeekDaysDates(): void{

    const currentDayNum = new Date().getDay();
    let mondayDate: Date;
    if (currentDayNum === 0) {
      // if sunday
      mondayDate = new Date(Date.now() - this.workWeekLength * this.msInDay);
    }else{
      mondayDate = new Date(Date.now() - (currentDayNum - 1) * this.msInDay);
    }
    this.weekDays = [{
      date: mondayDate,
      dayName: this.weekDaysName[0]
    }];
    this.fillDaysExceptMonday();
  }

  ngOnInit(): void {
    this.fillWeekDaysDates();
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
}
