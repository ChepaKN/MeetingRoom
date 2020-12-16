import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MeetingEntity} from "../meeting/meeting-entity";

@Injectable()
export class BackendService {

  url = 'http://localhost:8080/meetings'
  constructor(private http: HttpClient) { }

  getMeetings(): Observable<MeetingEntity[]>{
    return this.http.get<MeetingEntity[]>(this.url)
  }

  putMeeting(meeting: MeetingEntity):Observable<MeetingEntity>{
    return this.http.post<MeetingEntity>(this.url, meeting);
  }
}
