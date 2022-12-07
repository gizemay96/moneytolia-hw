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
  

  getCampaingList() {
    const campaignList: Campaign[] = this._localStorage.getData(this.serviceKey);
    this._campaignListSubject$.next(campaignList);
  }

  addCampaign(newCampaign: Campaign) {
    const newList: Campaign[] = [...this._localStorage.getData(this.serviceKey), ...[newCampaign]];
    this._localStorage.setData(this.serviceKey, newList, this._campaignListSubject$);
  }

  updateCampaing(updatedData: Campaign , index: number){
    const newList: Campaign[] = this._localStorage.getData(this.serviceKey);
    newList[index] = {...updatedData};
    this._localStorage.setData(this.serviceKey, newList, this._campaignListSubject$);
  }

  deleteCampaign(index: number) {
    const newList: Campaign[] = this._localStorage.getData(this.serviceKey);
    newList.splice(index, 1);
    this._localStorage.setData(this.serviceKey, newList, this._campaignListSubject$);
  }

}
