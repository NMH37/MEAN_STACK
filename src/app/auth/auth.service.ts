import { environment } from './../../environments/environment';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


const baseUrl = environment.apiUrl + '/users/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: string;
  token: string;
  isAllowed = false;
  private userId: string;
  // private errorEmitter = new Subject<string>();  // E 1
  private userStatusListener = new Subject<boolean>();
  constructor(private httpservice: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }
  getAuthStatusAfterLogin() {
    return this.isAllowed;
  }
  getUserStatus() {
    return this.userStatusListener.asObservable();
  }
  // getErrorMsg() {
  //    return this.errorEmitter.asObservable();
  //  }
  createUser(user: AuthData) {
    this.httpservice.post<AuthData>(baseUrl + 'signup', user)
      .subscribe(
        added_user => {
          console.log(added_user);
          this.router.navigate(['/']);
        }, error => {
          this.userStatusListener.next(false);
          //  this.errorEmitter.next(error.error.message);  // E 2
        });
  }
  getUserId() {
    return this.userId;
  }
  loginUser(user: AuthData) {
    this.httpservice.post<{ token: string, userId: string }>(baseUrl + 'login', user)
      .subscribe(result => {
        console.log(result);
        this.token = result.token;
        if (this.token) {
          this.userId = result.userId;
          this.userStatusListener.next(true);
          this.isAllowed = true;
          this.router.navigate(['/']);
        }
      }, error => {
        this.userStatusListener.next(false);
      });

  }
  logoutuser() {
    this.token = null;
    this.isAllowed = false;
    this.userId = null;
    this.userStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
/* error logic
error => {
  console.log(error.error.message);
  this.error = error.error.message;
} */
