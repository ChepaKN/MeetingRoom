import { Component, OnInit } from '@angular/core';
import {DayComponent} from '../day/day.component';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  private msInDay = 86400000;
  private msInWeek = this.msInDay * 7;
  private workWeekLength = 6;
  weekDays = new Array<DayComponent>(this.workWeekLength);
  weekDaysName = ['Понедельник', 'Вторник', 'Среда', 'Черверг', 'Пятница', 'Суббота'];

  constructor() {
    this.fillWeekDaysDates();
  }

  fillWeekDaysDates(): void{

    const currentDayNum = new Date().getDay();
    let mondayDate: Date;
    if (currentDayNum === 0) {
      // if sunday
      mondayDate = new Date(Date.now() - this.workWeekLength * this.msInDay);
    }else{
      mondayDate = new Date(Date.now() - (currentDayNum - 1) * this.msInDay);
    }
    this.weekDays[0] = new DayComponent(mondayDate, this.weekDaysName[0]);
    for (let i = 1; i < this.workWeekLength; i++){
      const date = new Date(this.weekDays[i - 1].getDate().valueOf() + this.msInDay);
      this.weekDays[i] = new DayComponent(date, this.weekDaysName[i]);
    }
  }

  ngOnInit(): void {
  }

  prevClick(): void {
    const newMondayDate = new Date(this.weekDays[0].getDate().valueOf() - this.msInWeek);
    this.weekDays[0] = new DayComponent(newMondayDate, this.weekDaysName[0]);
    this.fillDaysExceptMonday();
  }

  nextClick(): void {
    const newMondayDate = new Date(this.weekDays[0].getDate().valueOf() + this.msInWeek);
    this.weekDays[0] = new DayComponent(newMondayDate, this.weekDaysName[0]);
    this.fillDaysExceptMonday();
  }

  private fillDaysExceptMonday(): void{
    for (let i = 1; i < this.workWeekLength; i++){
      const nextDayDate = new Date(this.weekDays[i - 1].getDate().valueOf() + this.msInDay);
      this.weekDays[i] = new DayComponent(nextDayDate, this.weekDaysName[i]);
    }
  }
}
