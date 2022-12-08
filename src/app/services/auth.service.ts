import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user-model';
import { LocalstorageRefService } from './localstorage.service';
import { BehaviorSubject, filter, fromEvent, map } from 'rxjs';
import { LocalStorageKey } from 'src/app/core/models/localstorage_models';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public _isLogined$ = new BehaviorSubject<boolean>(false);
  public isLogined$ = this._isLogined$.asObservable();

  userList: User[] = require('../core/data/users.json');
  serviceKey: LocalStorageKey = 'isLogined';

  // If login data removed from local storage or local storage full reset , below field will trigger
  signOutEventFromLocalStorage$ = fromEvent<StorageEvent>(window, "storage").pipe(
    filter(event => event.storageArea === localStorage),
    map(event => JSON.parse(event.storageArea?.['isLogined'] || false))
  );

  constructor(private localStorageService: LocalstorageRefService, private router: Router) { }

  setLoginData() {
    this._isLogined$.next(this.localStorageService.getData(this.serviceKey));
  }

  signIn(user: User): boolean {
    const response = this.userList.some(value => Object.entries(value).toString() === Object.entries(user).toString());
    this._isLogined$.next(response);
    this.localStorageService.setData(this.serviceKey, true);
    return response;
  }

  signOut() {
    this.localStorageService.clearInfo(this.serviceKey);
    this._isLogined$.next(false);
  }
}
