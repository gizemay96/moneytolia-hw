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

  get currentList() {
    return this._campaignListSubject$.getValue();
  }

  getCampaingList() {
    const campaignList: Campaign[] = this._localStorage.getData(this.serviceKey);
    return this._campaignListSubject$.next(campaignList);
  }

  addCampaign(newCampaign: Campaign) {
    this._campaignListSubject$.next([...this.currentList, newCampaign]);
    this._localStorage.setData(this.serviceKey, this.currentList, this._campaignListSubject$);
  }

  updateCampaing(updatedData: Campaign, index: number) {
    const currentList = this.currentList;
    currentList[index] = updatedData;
    this._campaignListSubject$.next([...currentList]);
    this._localStorage.setData(this.serviceKey, this.currentList, this._campaignListSubject$);
  }

  deleteCampaign(index: number) {
    this._campaignListSubject$.next(this.currentList.filter((item, ind) => ind !== index))
    this._localStorage.setData(this.serviceKey, this.currentList, this._campaignListSubject$);
  }

}
