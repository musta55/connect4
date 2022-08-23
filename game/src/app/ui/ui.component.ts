import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})



export class UIComponent implements OnInit {

  constructor() { }
<<<<<<< HEAD

  i: number=0;
  row: number = 0;
  col: number = 0;
  
  isFilled:boolean[] = new Array(42);
=======
  visible = true;
  HUMAN = 1;
  AI = 2;
  EMPTY = 0;
  windowLength = 4;
  COL_COUNT = 7;
  ROW_COUNT = 6;
  i: number = 0;
  isFilled: boolean[] = new Array(42);
>>>>>>> c5a2fc39fede5c0319fc99391e91f7d64eaff390
  currentTurnNumber: number = 0;

  rowIndextoSit: number[] = new Array(7);

  currentTurnPlayer: boolean = true;

  whoseTurn: string[] = new Array(42);

  makeRed:boolean[] = new Array(42);
  makeYellow:boolean[] = new Array(42);


   board = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ]

  testBoard = [
    [0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0],
    [0,2,2,0,1,1,0],
    [0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0],
    [0,0,1,0,0,0,0]
  ]

  ngOnInit(): void {
    
    var counter= this.countPiece(this.testBoard[1],1);
    console.log("Counter holo " +counter)
    for (this.i = 0; this.i < 42; this.i++) {
      this.isFilled[this.i] = false;
      this.whoseTurn[this.i] = 'player';
      this.makeRed[this.i] = false;
      this.makeYellow[this.i] = false;
    }

    console.log("Winning ",this.winningMove(this.testBoard,1))

    console.log("Terminal check", this.isTerminal(this.testBoard))

    console.log("Score Check ", this.scoreForCurrentPosition(this.testBoard,this.HUMAN))



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

  changeColour(i: number) {
    console.log("The position is " + i);

    var row = Math.floor(i / 7);
    var col = i % 7;
    
    console.log("Row and Column " + row + " " + col + " " + this.rowIndextoSit[col]);

    if (this.currentTurnPlayer) {
      this.currentTurnPlayer = false;
      this.whoseTurn[this.rowIndextoSit[col]] = 'player';
      this.board[row] [col] =this.HUMAN;
      console.log("Next turn is bot");
    }
    else {
      this.currentTurnPlayer = true;
      this.whoseTurn[this.rowIndextoSit[col]] = 'bot';
      this.board[row] [col] =this.AI;
      console.log("Next turn is human");
    }

    this.isFilled[this.rowIndextoSit[col]] = true;
    this.rowIndextoSit[col] -= 7;

    this.currentTurnNumber++;

  }

  setStarter(input: number) {
    this.visible = false;
    if (input == 0) {
      this.currentTurnPlayer = true;
    }
    else {
      this.currentTurnPlayer = false;
    }
  }


  winningMove(board: number[][], piece: number) {
    for (var c = 0; c < this.COL_COUNT - 3; c++) {
      for (var r = 0; r < this.ROW_COUNT; r++) {
        //horizontal check
        if (board[r][c] == piece && board[r][c + 1] == piece && board[r][c + 2] == piece && board[r][c + 3] == piece) {
          return true;
        }
      }
    }

    //vertical move
    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT; c++) {
        if (board[r][c] == piece && board[r + 1][c] == piece && board[r + 2][c] == piece && board[r + 3][c] == piece) {
          return true;
        }
      }
    }


    //pos diagonal move
    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT - 3; c++) {
        if (board[r][c] == piece && board[r + 1][c + 1] == piece && board[r + 2][c + 2] == piece && board[r + 3][c + 3] == piece) {
          return true;
        }
      }
    }

    //neg diagonal move
    for (var c = 0; c < this.COL_COUNT - 3; c++) {
      for (var r = 3; r < this.ROW_COUNT; r++) {
        if (board[r][c] == piece && board[r - 1][c + 1] == piece && board[r - 2][c + 2] == piece && board[r - 3][c + 3] == piece) {
          return true;
        }
      }
    }

    return false;
  }


  isValidLocation(board: number[][], col: number) {
    return board[this.ROW_COUNT - 1][col] == this.EMPTY;
  }

  getNextOpenRow(board: number[][], col: number) {
    for (var r = 0; r < this.ROW_COUNT; r++) {
      if (board[r][col] == this.EMPTY) {
        return r;
      }
    }
    return 19;
  }

  countPiece(pieces: number[], target: number) {
    var count = 0;
    pieces.forEach(value => {
      if (target == value) {
        count += 1;
      }
    });


    return count;
  }

  evaluateWindow(window: number[], curPlayer: number) {
    var score = 0;


    var opponentPiece = this.HUMAN;

<<<<<<< HEAD
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
=======
    if (curPlayer == this.HUMAN) {
      opponentPiece = this.AI;

    }

    var curPlayerCount = this.countPiece(window, curPlayer);

    var emptyCount = this.countPiece(window, this.EMPTY);
    var opponentCount = this.countPiece(window, opponentPiece);


    if (curPlayerCount == 4) score += 100;
    else if (curPlayerCount == 3 && emptyCount == 1) score += 5;
    else if (curPlayerCount == 2 && emptyCount == 2) score += 2;
    else if (opponentCount == 3 && emptyCount == 1) score -= 5;

    return score;

  }

  scoreForCurrentPosition(board: number[][], curPlayer: number) {
    var centerArray = [];
    var score = 0;
    for (var r = 0; r < this.ROW_COUNT; r++) {
      centerArray.push(board[r][this.COL_COUNT / 2]);

    }

    var centerPieceCount = 0;
    centerPieceCount = this.countPiece(centerArray, curPlayer);
    score += centerPieceCount * 3;


    //For horizontal array 


    for (var r = 0; r < this.ROW_COUNT; r++) {
      for (var c = 0; c < this.COL_COUNT - 3; c++) {
        var horizontalArray = [];

        horizontalArray.push(board[r][c]);
        horizontalArray.push(board[r][c + 1]);
        horizontalArray.push(board[r][c + 2]);
        horizontalArray.push(board[r][c + 3]);


        score += this.evaluateWindow(horizontalArray, curPlayer);

      }
    }


    // For vertical array

    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT; c++) {
        var verticalArray = [];

        verticalArray.push(board[r][c]);
        verticalArray.push(board[r + 1][c]);
        verticalArray.push(board[r + 2][c]);
        verticalArray.push(board[r + 3][c]);


        score += this.evaluateWindow(verticalArray, curPlayer);

      }
    }

    // For  pos Diagonal array 

    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT - 3; c++) {
        var posDiagonalArray = [];

        posDiagonalArray.push(board[r][c]);
        posDiagonalArray.push(board[r + 1][c + 1]);
        posDiagonalArray.push(board[r + 2][c + 2]);
        posDiagonalArray.push(board[r + 3][c + 3]);


        score += this.evaluateWindow(posDiagonalArray, curPlayer);

      }
    }


    // For neg diagonal array
    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT - 3; c++) {
        var posDiagonalArray = [];

        posDiagonalArray.push(board[r][c + 3]);
        posDiagonalArray.push(board[r + 1][c + 2]);
        posDiagonalArray.push(board[r + 2][c + 1]);
        posDiagonalArray.push(board[r + 3][c]);


        score += this.evaluateWindow(posDiagonalArray, curPlayer);

      }
    }

    return score;


  }

>>>>>>> c5a2fc39fede5c0319fc99391e91f7d64eaff390

  validMove(board:number[][]){
    var validLocation=[];

    for(var c=0;c< this.COL_COUNT; c++){
      if(this.isValidLocation(board,c)){
        validLocation.push(c);
      }
    }

    return validLocation;

  }

  
<<<<<<< HEAD
}
}
=======
  isTerminal(board: number[][]) {
    return this.winningMove(board,this.HUMAN) || this.winningMove(board,this.AI) || this.validMove(board).length==0;
  }


}
>>>>>>> c5a2fc39fede5c0319fc99391e91f7d64eaff390
