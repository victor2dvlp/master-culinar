import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSignup(signupForm: NgForm) {
    this.router.navigate(['/signin']);
    const mail = signupForm.value.email;
    const password = signupForm.value.password;
    console.log('Email: ' + signupForm.value.email);
    console.log('password: ' + signupForm.value.password);
    console.log(signupForm);
    console.log(signupForm.controls.email);
    this.authService.signupUser(mail, password);
  }

}
