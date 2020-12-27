import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AuthorizationDto} from '../dto/authorization-dto';
import {UserDto} from '../dto/user-dto';

@Injectable()
export class AuthorizationService {

  refreshStatus = new Subject();
  refreshCurrentUser = new Subject();
  url = 'http://localhost:8080/authorization';

  constructor(private http: HttpClient) { }

  login(userData: AuthorizationDto): Observable<HttpResponse<UserDto>>{
    return this.http.post<UserDto>(this.url, userData, {observe: 'response'});
  }

  logout(): Observable<void>{
    return  this.http.get<void>(this.url + '/logout');
  }

  getLoginStatus(): Observable<boolean>{
    return this.http.get<boolean>(this.url);
  }

  getCurrentUser(): Observable<UserDto>{
    return this.http.get<UserDto>(this.url + '/getUser');
  }
}
