import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../core/models/localstorage_models';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageRefService {

  constructor() { }

  setData(key: LocalStorageKey, data: any) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  getData(key: LocalStorageKey) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  clearInfo(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }

}
