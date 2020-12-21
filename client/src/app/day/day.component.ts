import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  private readonly date: Date;
  private readonly dayName: String;

  constructor(date: Date, dayName: String) {
    this.date = date;
    this.dayName = dayName;
  }

  getDate(): Date{
    return this.date;
  }

  getDayName(): String{
    return this.dayName;
  }

  ngOnInit(): void {
  }

}
