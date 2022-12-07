import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user-model';
import { LocalstorageRefService } from './localstorage.service';
import { filter, fromEvent, map } from 'rxjs';
import { LocalStorageKey } from 'src/app/core/models/localstorage_models';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userList: User[] = require('../core/data/users.json');
  serviceKey: LocalStorageKey = 'isLogined';


  signOutEventFromLocalStorage$ = fromEvent<StorageEvent>(window, "storage").pipe(
    filter(event => event.storageArea === localStorage),
    filter(event => event.key === this.serviceKey),
    map(event => JSON.parse(event.newValue!))
  );

  constructor(private localStorageService: LocalstorageRefService) { }

  isLogined(): boolean {
    return !!this.localStorageService.getData(this.serviceKey);
  }

  signIn(user: User): boolean {
    const response = this.userList.some(value => Object.entries(value).toString() === Object.entries(user).toString());
    this.localStorageService.setData(this.serviceKey, true);
    return response;
  }

  signOut() {
    this.localStorageService.clearInfo(this.serviceKey);
  }
}
