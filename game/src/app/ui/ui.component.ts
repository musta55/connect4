import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UIComponent implements OnInit {

  constructor() { }

  i: number=0;
  row: number = 0;
  col: number = 0;
  
  isFilled:boolean[] = new Array(42);
  currentTurnNumber: number = 0;

  rowIndextoSit: number[] = new Array(7);

  currentTurnPlayer: boolean = true;

  whoseTurn: string[] = new Array(42);

  makeRed:boolean[] = new Array(42);
  makeYellow:boolean[] = new Array(42);


  ngOnInit(): void {
    for(this.i=0;this.i<42;this.i++){
      this.isFilled[this.i] = false;
      this.whoseTurn[this.i] = 'player';
      this.makeRed[this.i] = false;
      this.makeYellow[this.i] = false;
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

  this.row = Math.floor(i/7);
  this.col = i%7;
  console.log("Row and Column " + this.row + " " +  this.col + " " + this.rowIndextoSit[this.col]);

  if(this.currentTurnPlayer){
    this.currentTurnPlayer = false;
    this.whoseTurn[this.rowIndextoSit[this.col]] = 'player';

    for(var tiles = 0; tiles<42 ; tiles++){
      if(tiles%7==this.col){
        this.makeRed[tiles] = true;
        console.log("Should be red " + tiles);
        // if(tiles-7>=0){
        //   this.makeRed[tiles-7] = false;
        // }
      }
    }

    console.log("Next turn is bot");
  }
  else{
    this.currentTurnPlayer = true;
    this.whoseTurn[this.rowIndextoSit[this.col]] = 'bot';
    console.log("Next turn is human");
  }

  this.isFilled[this.rowIndextoSit[this.col]] = true;
  this.rowIndextoSit[this.col] -= 7;

  this.currentTurnNumber++;
  
}
}