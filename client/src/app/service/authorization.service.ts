import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationDto} from './authorization-dto';

@Injectable()
export class AuthorizationService {

  url = 'http://localhost:8080/authorization';
  constructor(private http: HttpClient) { }

  login(userData: AuthorizationDto): Observable<HttpResponse<boolean>>{
    return this.http.post<boolean>(this.url, userData, {observe: 'response'});
  }

}
