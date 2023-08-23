import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  
  [x: string]: any;
  isAuth =  false;
  private userSub: Subscription;
  collapsed = true;

  constructor(private authService: AuthService ){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      // esto es lo mismo que : this.isAuth = !user ? false : true
      this.isAuth = !!user;
    })
  }

  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy() {
      this.userSub.unsubscribe();
  }
}
