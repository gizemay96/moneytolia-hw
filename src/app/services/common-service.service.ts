import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  getCampaignIconasType(type: number) {
    switch (type) {
      case 1:
        return 'food.png'
      case 2:
        return 'shopping.png'
      case 3:
        return 'movie_tv.png'
      case 4:
        return 'coffee.png'
      case 5:
        return 'game.png'

      default:
        return ''
    }
  }

}
