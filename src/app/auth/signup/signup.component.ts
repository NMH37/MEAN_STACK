import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthData } from '../auth-data.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private user: AuthData;
  errorMessages: string;
  private errorSubs: Subscription;
  private userStatusSubs: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userStatusSubs = this.authService.getUserStatus().subscribe(isAuth =>
      console.log(isAuth));
    // this.errorSubs = this.authService.getErrorMsg().subscribe(errorMsg => {
    //   this.errorMessages = errorMsg;
    // }); // will use it for error handling soon :)
  }
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.user = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.createUser(this.user);
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.userStatusSubs.unsubscribe();
    // this.errorSubs.unsubscribe();
  }
}
