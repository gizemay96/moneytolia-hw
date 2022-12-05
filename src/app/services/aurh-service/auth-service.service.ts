import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user-model';
import { IAuthService } from './IAuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements IAuthService {

  constructor() {}
  isLogined(): boolean {
   return false;
  }
  
  signIn(): Observable<User> {
    throw new Error('Method not implemented.');
  }
}
