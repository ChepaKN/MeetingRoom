import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../service/authorization.service';
import {AuthorizationDto} from '../dto/authorization-dto';
import {Subscription} from 'rxjs';
import {UserDto} from '../dto/user-dto';
import {repeatWhen} from 'rxjs/operators';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.css']
})
export class AuthorizationFormComponent implements OnInit, OnDestroy {

  authorizationForm: FormGroup;
  authorizationDTO: AuthorizationDto;
  currentUserSubscription = new Subscription();
  loginStatusSubscription = new Subscription();

  user = new UserDto();
  isLogin = false;

  @Output()
  loginStatusEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  userEmitter: EventEmitter<UserDto> = new EventEmitter<UserDto>();
  @Output()
  isAdminEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authorizationService: AuthorizationService) {
    this.authorizationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    });
  }

  ngOnInit(): void {
    this.loginStatusSubscription = this.authorizationService.getLoginStatus()
      .pipe(repeatWhen(() => this.authorizationService.refreshStatus))
      .subscribe((status) => {
        this.isLogin = status;
        this.loginStatusEmitter.emit(this.isLogin);
      });



    this.currentUserSubscription = this.authorizationService.getCurrentUser()
      .pipe(repeatWhen(() => this.authorizationService.refreshCurrentUser))
      .subscribe((user) => {
        this.user = user;
        if (this.user != null){
          this.isAdminEmitter.emit(this.user.login === 'root');
          this.userEmitter.emit(this.user);
        }else{
          this.isAdminEmitter.emit(false);
        }
      });
  }

  logOut(): void{
    const logoutSubscription =
    this.authorizationService.logout().subscribe(() => {
      this.authorizationService.refreshStatus.next();
      this.authorizationService.refreshCurrentUser.next();
      logoutSubscription.unsubscribe();
    });
  }

  login(): void {
    const value = this.authorizationForm.value;
    this.authorizationDTO =
      {
        login: value.username,
        password: value.password
      };
    const authorizationSubscription = this.authorizationService.login(this.authorizationDTO)
      .subscribe((resp) => {
        this.authorizationService.refreshStatus.next();
        this.authorizationService.refreshCurrentUser.next();
        authorizationSubscription.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }
}
