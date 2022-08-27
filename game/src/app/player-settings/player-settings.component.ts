import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player-settings',
  templateUrl: './player-settings.component.html',
  styleUrls: ['./player-settings.component.css']
})
export class PlayerSettingsComponent implements OnInit {

  constructor(public gameService: GameService, private route: Router) { }

  whoseTurn_visible = true;
  showDifficulty = true;

  error = "Please select an option from above to start the game";
  isError = false;

  start = true;
  who: number = 0;
  level: number = 0;

  player = 2;
  levelSelected = 0;

  allSelected = false;

  ngOnInit(): void {
  }

  setStarter(who: number){
     this.who = who;
     this.player = who;
     this.checkIfAllSelected();
     console.log("Whoo "+ who);
  }

  setDifficulty(level: number){
    this.level = level;
    this.levelSelected = level;
    this.checkIfAllSelected();
    console.log("Level "+ level);
  }

  startGame(){
    this.route.navigate(['/game']);
    this.gameService.start(this.who,this.level);
  }

  checkIfAllSelected(){
    if(this.player!=2 && this.levelSelected!=0){
      this.allSelected = true;
     }
  }

}
