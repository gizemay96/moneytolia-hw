import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export default class LoginComponent {
  public loginForm: FormGroup;
  loginError = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.loginForm.controls['email'].setValue('admin@gmail.com');
    this.loginForm.controls['password'].setValue('12345');
    this.authService.signOut();
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

  setForm() {
    this.loginForm.controls['email'].setValue('admin@gmail.com');
    this.loginForm.controls['password'].setValue('12345');
  }


}
