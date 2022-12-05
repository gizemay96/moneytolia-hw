import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }


  login(): void {
    // console.log(this.loginForm.value);
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      localStorage.setItem("user", JSON.stringify(this.loginForm.value));
      this.router.navigate(["/dashboard"]);
    }
  }


}
