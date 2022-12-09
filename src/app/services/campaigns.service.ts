import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Campaign } from 'src/app/core/models/compaign_model';
import { LocalStorageKey } from 'src/app/core/models/localstorage_models';
import { LocalstorageRefService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {


  constructor(private _localStorage: LocalstorageRefService) { }

  public _campaignListSubject$ = new BehaviorSubject<Campaign[]>([]);
  public campaignListObs$ = this._campaignListSubject$.asObservable();
  serviceKey: LocalStorageKey = 'campaignList';

  get currentList() : Campaign[] {
    return this._campaignListSubject$.getValue();
  }

  setCampaigns() {
    this._campaignListSubject$.next(this._localStorage.getData(this.serviceKey) || []);
  }

  addCampaign(newCampaign: Campaign) {
    this._campaignListSubject$.next([...this.currentList, newCampaign]);
    this._localStorage.setData(this.serviceKey, this.currentList);
  }

  updateCampaing(updatedData: Campaign, index: number) {
    const currentList = this.currentList;
    currentList[index] = updatedData;
    this._campaignListSubject$.next([...currentList]);
    this._localStorage.setData(this.serviceKey, this.currentList);
  }

  deleteCampaign(index: number) {
    this._campaignListSubject$.next(this.currentList.filter((item, ind) => ind !== index))
    this._localStorage.setData(this.serviceKey, this.currentList);
  }

}


