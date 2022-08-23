import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UIComponent implements OnInit {

  constructor() { }

  i: number=0;
  isFilled:boolean[] = new Array(42);
  currentTurnNumber: number = 0;

  rowIndextoSit: number[] = new Array(7);

  currentTurnPlayer: boolean = true;

  whoseTurn: string[] = new Array(42);

  tiles = document.getElementsByClassName('inner-circle');

  ngOnInit(): void {
    for(this.i=0;this.i<42;this.i++){
      this.isFilled[this.i] = false;
      this.whoseTurn[this.i] = 'player';
    }

    this.rowIndextoSit[0] = 35;
    this.rowIndextoSit[1] = 36;
    this.rowIndextoSit[2] = 37;
    this.rowIndextoSit[3] = 38;
    this.rowIndextoSit[4] = 39;
    this.rowIndextoSit[5] = 40;
    this.rowIndextoSit[6] = 41;
  }
  
  tilesNumber: number = 42;

  

counter(i: number) {
  return new Array(i);
}

changeColour(i: number){
  console.log("The position is "+ i);

  var row = Math.floor(i/7);
  var col = i%7;
  console.log("Row and Column " + row + " " +  col + " " + this.rowIndextoSit[col]);

  if(this.currentTurnPlayer){
    this.currentTurnPlayer = false;
    this.whoseTurn[this.rowIndextoSit[col]] = 'player';
    console.log("Next turn is bot");
  }
  else{
    this.currentTurnPlayer = true;
    this.whoseTurn[this.rowIndextoSit[col]] = 'bot';
    console.log("Next turn is human");
  }

  this.isFilled[this.rowIndextoSit[col]] = true;
  this.rowIndextoSit[col] -= 7;

  this.currentTurnNumber++;
  
}

}
