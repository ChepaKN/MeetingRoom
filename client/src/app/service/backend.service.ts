import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {MeetingEntity} from '../meeting/meeting-entity';
import {DbQueryDTO} from '../dto/db-query-dto';

@Injectable()
export class BackendService {

  refreshMeetings = new Subject();

  url = 'http://localhost:8080/meetings';
  constructor(private http: HttpClient) { }

  getMeetings(): Observable<MeetingEntity[]>{
    return this.http.get<MeetingEntity[]>(this.url);
  }

  getMeetingsByWeek(queryDTO: DbQueryDTO): Observable<MeetingEntity[]>{
    return this.http.post<MeetingEntity[]>(this.url + '/findByWeek', queryDTO);
  }

  putMeeting(meeting: MeetingEntity): Observable<HttpResponse<MeetingEntity>>{
    return this.http.post<MeetingEntity>(this.url, meeting, {observe: 'response'});
  }

  deleteAllMeetings(): Observable<MeetingEntity>{
    return this.http.delete<MeetingEntity>(this.url);
  }

  refreshMeetingsData(): void{
    this.refreshMeetings.next();
  }

}
