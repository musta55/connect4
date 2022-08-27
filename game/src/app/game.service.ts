import { Injectable } from '@angular/core';
import { UIComponent } from './ui/ui.component';

@Injectable({
  providedIn: 'root'
})


export class GameService {
  
  startingPLayer: number = 0;

  constructor() { }

  who=0;
  level=7;

  setPlayer(val: number){
    this.startingPLayer = val;
  }

  getPlayer(){
    return this.startingPLayer;
  }

  start(who:number, level:number){
    this.who = who;
    this.level = level;
  }

  getWho(){
    return this.who;
  }

  getLevel(){
    return this.level;
  }

}
