import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from '../dto/user-dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user: UserDto;

  constructor() { }

  ngOnInit(): void {
  }

}
