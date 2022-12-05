import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Campaign } from 'src/app/core/models/compaign_model';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private http: HttpClient) { }

  getCampaingList() {
    const request = this.http.get<Campaign[]>(`https://638c5087d2fc4a058a5552ca.mockapi.io//campaigns`);
    return request.pipe(map((res) => {
      return res || [];
    }), catchError(() => of([])));
  }

  addCampaign(newCampaign: Campaign) {
    const request = this.http.post('https://638c5087d2fc4a058a5552ca.mockapi.io/campaigns', newCampaign)
    return request.pipe(map((res) => {
      return res || [];
    }), catchError(() => of(false)));
  }

  deleteCampaign(campaign: Campaign) {
    const request = this.http.delete<Campaign[]>(`https://638c5087d2fc4a058a5552ca.mockapi.io/campaigns/${campaign.id}`)
    return request.pipe(map((res) => {
      return res || [];
    }), catchError(() => of(false)));
  }

}
