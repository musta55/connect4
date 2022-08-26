import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})



export class UIComponent implements OnInit {

  constructor() { }

  i: number = 0;
  row: number = 0;
  col: number = 0;

  isFilled: boolean[] = new Array(42);

  visible = true;
  HUMAN = 1;
  AI = 2;
  EMPTY = 0;
  windowLength = 4;
  COL_COUNT = 7;
  ROW_COUNT = 6;

  currentTurnNumber: number = 0;

  rowIndextoSit: number[] = new Array(7);

  currentTurnPlayer: boolean = true;

  whoseTurn: string[] = new Array(42);

  makeRed: boolean[] = new Array(42);
  makeYellow: boolean[] = new Array(42);

  getTiles = document.getElementsByClassName("coin");

  getCurrentTileX = 0;
  arrowVisible = false;


  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]

  testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 2, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0]
  ]

  tempBoard: number[][] = [[]];
  invisible: boolean = true;
  whoWon: string = '';
  ngOnInit(): void {

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

  changeArrow(index: number){
    this.arrowVisible = true;
    //console.log("Hovering on tile no " + index);
    this.getCurrentTileX = this.getTiles[index].getBoundingClientRect().left;   // Get tile left position
  }

  positionLeft(): Object{
      if (this.arrowVisible){
          return {'left.px': this.getCurrentTileX, visibility: 'visible'}
      }
      else{
        return { visibility: 'hidden'}
      }
  }

  changeColour(i: number) {
   // console.log("The position is " + i);

    
    var col = i % 7;
    //var row = Math.floor(i / 7);
    var row = this.getNextOpenRow(this.board,col);
    console.log("Row and Column " + row + " " + col + " " + this.rowIndextoSit[col]);

    if (this.currentTurnPlayer) {
      
      this.currentTurnPlayer = false;
      this.whoseTurn[this.rowIndextoSit[col]] = 'player';
      console.log('calc tasmia: ', row);
      this.board[row][col] = this.HUMAN;
      if(this.winningMove(this.board, this.HUMAN)){
        console.log("Player won");
        this.whoWon = 'player'
      }
      else{
        this.isFilled[this.rowIndextoSit[col]] = true;
        this.rowIndextoSit[col] -= 7;

        this.currentTurnNumber++;
        this.changeColour(0);
      }
    }
    else {
      this.currentTurnPlayer = true;
      var result = this.minimax(this.board, 7, -Infinity, Infinity, true);
      col = result[0];
      if( this.isValidLocation(this.board, col)){
        var row = this.getNextOpenRow(this.board, col);
        console.log('calc ai: ', row);
        this.board[row][col] = this.AI;
        this.whoseTurn[this.rowIndextoSit[col]] = 'bot';
        this.board[row][col] = this.AI;
        if(this.winningMove(this.board, this.AI)){
          console.log('AI won');
          this.whoWon = 'AI'
        }
        this.isFilled[this.rowIndextoSit[col]] = true;
        this.rowIndextoSit[col] -= 7;
        this.currentTurnNumber++;
      }
      
    }
    //console.log(this.board)
  }

  setStarter(input: number) {
    this.visible = false;
    this.invisible = false;
    if (input == 0) {
      this.currentTurnPlayer = true;
    }
    else {
      this.currentTurnPlayer = false;
      this.changeColour(0);
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

  scoreForCurrentPosition(board: number[][], curPlayer: number):number {
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


  validMove(board: number[][]) {
    var validLocation = [];

    for (var c = 0; c < this.COL_COUNT; c++) {
      if (this.isValidLocation(board, c)) {
        validLocation.push(c);
      }
    }

    return validLocation;

  }

  isTerminal(board: number[][]) {
    return this.winningMove(board, this.HUMAN) || this.winningMove(board, this.AI) || this.validMove(board).length == 0;
  }


  minimax(board: number[][], depth:number, alpha:number, beta:number, maximizingPlayer:boolean): number[]{
    var validLocations = this.validMove(board);
    var is_terminal = this.isTerminal(board);
    if(depth == 0 || is_terminal){
      if(is_terminal){
        if(this.winningMove(board, this.AI)){
          //-1 means game is over, no valid moves left
          return [-1,10000000];
        }
        else if(this.winningMove(board, this.HUMAN)){
          return [-1,-10000000];
        }
        else{
          return [-1,0];
        }
      }
      else{
        return [-1,this.scoreForCurrentPosition(board, this.AI)];
      }
    }
    if(maximizingPlayer){
      var value = -Infinity;
      var column = validLocations[0];
      var row = 0;
      this.tempBoard = [[]];
      for(var i=0;i< validLocations.length; i++){
        var col = validLocations[i];
        row = this.getNextOpenRow(board, col);
        this.tempBoard = JSON.parse(JSON.stringify(board));
        this.tempBoard[row][col] = this.AI;
        var new_score = this.minimax(this.tempBoard, depth-1, alpha, beta, false);
        if(new_score[1] > value){
          value = new_score[1];
          column = col;
        }
        if(value>alpha) alpha = value;
        if(alpha>=beta) break;
      }
      return [column, value];
    }

    else{
      var value = Infinity;
      var column = validLocations[0];
      var row = 0;
      this.tempBoard = [[]];
      for(var i=0;i< validLocations.length; i++){
        var col = validLocations[i];
        row = this.getNextOpenRow(board, col);
        this.tempBoard = JSON.parse(JSON.stringify(board));
        this.tempBoard[row][col] = this.HUMAN;
        var new_score = this.minimax(this.tempBoard, depth-1, alpha, beta, true);
        if(new_score[1] < value){
          value = new_score[1];
          column = col;
        }
        if(value<beta) beta = value;
        if(alpha>=beta) break;
      }
      return [column, value];
    }
  }

  bestMove(board:number[][], curPlayer:number){
    var validLocations = this.validMove(board);
    var best_score = -Infinity;
    var best_col = validLocations[0];
    for(var i=0;i< validLocations.length; i++){
      var col = validLocations[i];
      var row = this.getNextOpenRow(board, col);
      this.tempBoard = JSON.parse(JSON.stringify(board));
      this.tempBoard[row][col] = curPlayer;
      var score = this.scoreForCurrentPosition(this.tempBoard, curPlayer);
      if(score >= best_score){
        best_score = score;
        best_col = col;
      }
    }
    return best_col;
  }

}
