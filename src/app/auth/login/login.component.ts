import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { AuthData } from './../auth-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: AuthData;
  error: string;
  userStatusSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userStatusSubs = this.authService.getUserStatus().subscribe(isAuth =>
      console.log(isAuth)); // will use it for error handling soon :)
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.user = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.loginUser(this.user);
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.userStatusSubs.unsubscribe();
  }
}
