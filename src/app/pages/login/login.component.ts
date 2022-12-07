import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup;
  loginError = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService
    ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const response = this.authService.signIn(this.loginForm.value);
      if (response) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.loginError = true;
      }
    }
  }


}
