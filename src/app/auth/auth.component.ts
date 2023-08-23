import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginModo  = true;
  isLoading  = false;
  error:string = null;
  
  constructor(private authService: AuthService, private router:Router){}

  onLoginModo(){
    this.isLoginModo = !this.isLoginModo;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }
    const email = form.value.email
    const password = form.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if(this.isLoginModo){
      authObs = this.authService.login(email,password)
    } else {
      authObs = this.authService.signup(email,password)
    }

    authObs.subscribe( resData => {
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errorMsj => {
      console.log(errorMsj);
      this.error = errorMsj
      this.isLoading = false
    })

    form.reset()
  }
}
