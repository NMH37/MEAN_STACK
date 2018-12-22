import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userAuthSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userAuthSubs = this.authService.getUserStatus().subscribe(userIsAllowed =>
      this.isAuthenticated = userIsAllowed);
  }
  onLogOut() {
    this.authService.logoutuser();
  }
  ngOnDestroy() {
    this.userAuthSubs.unsubscribe();
  }
}
