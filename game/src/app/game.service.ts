import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class GameService {
  
  startingPLayer: number = 0;

  constructor() { }

  setPlayer(val: number){
    this.startingPLayer = val;
  }

  getPlayer(){
    return this.startingPLayer;
  }

}
