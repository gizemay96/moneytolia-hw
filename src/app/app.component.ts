import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moneytolia2';

  constructor(private authService: AuthServiceService, private router: Router) {
    this.authService.signOutEventFromLocalStorage$.subscribe(isLogined => {
      !isLogined && this.router.navigate(['/']);
    });
  }
}
