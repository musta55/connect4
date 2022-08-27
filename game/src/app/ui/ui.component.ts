import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})



export class UIComponent implements OnInit {

  constructor(public gameService: GameService, private route: Router) { }

  i: number = 0;
  row: number = 0;
  col: number = 0;

  isFilled: boolean[] = new Array(42);

  error = "Please select an option from above to start the game";
  isError = false;

  whoseTurn_visible = true;
  HUMAN = 1;
  AI = 2;
  EMPTY = 0;
  windowLength = 4;
  COL_COUNT = 7;
  ROW_COUNT = 6;
  showDifficulty = true;

  turn = "Player";
  turnCoin_url = "../../assets/images/";
  turnCoin = "";

  currentTurnNumber: number = 0;

  rowIndextoSit: number[] = new Array(7);

  currentTurnPlayer: boolean = true;

  whoseTurn: string[] = new Array(42);
  winning: boolean[] = new Array(42);

  makeRed: boolean[] = new Array(42);
  makeYellow: boolean[] = new Array(42);

  getTiles = document.getElementsByClassName("coin");
  difficulty: number = 7;

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

  // testBoard = [
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 1, 1, 1, 0, 0],
  //   [0, 2, 2, 0, 1, 1, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 0, 0],
  //   [0, 0, 1, 0, 0, 0, 0]
  // ]

  tempBoard: number[][] = [[]];
  invisible: boolean = true;
  whoWon: string = '';
  gameEnd: boolean = false;
  winningLine: string = '';

  who = 0;

  winningR: number[] = new Array(4);
  winningC: number[] = new Array(4);


  ngOnInit(): void {

    this.who = this.gameService.getWho();
    this.difficulty = this.gameService.getLevel();
    

    for (this.i = 0; this.i < 42; this.i++) {
      this.isFilled[this.i] = false;
      this.whoseTurn[this.i] = 'player';
      this.makeRed[this.i] = false;
      this.makeYellow[this.i] = false;
      this.winning[this.i] = false;
    }

    this.rowIndextoSit[0] = 35;
    this.rowIndextoSit[1] = 36;
    this.rowIndextoSit[2] = 37;
    this.rowIndextoSit[3] = 38;
    this.rowIndextoSit[4] = 39;
    this.rowIndextoSit[5] = 40;
    this.rowIndextoSit[6] = 41;

    this.turnCoin = this.turnCoin_url + "redCoin.png";

    if(this.who==1){
      this.setStarter(this.who);
    }
  }

  tilesNumber: number = 42;

  reset(){
    this.route.navigate(['/player']);
  }

  setDifficulty(level: number) {
    this.difficulty = level;
    this.showDifficulty = false;
    console.log("Difficulty " + this.showDifficulty);
  }

  counter(i: number) {
    return new Array(i);
  }

  changeArrow(index: number) {
    this.arrowVisible = true;
    console.log("Hovering on tile no " + index);
    this.getCurrentTileX = this.getTiles[index].getBoundingClientRect().left;   // Get tile left position
  }

  positionLeft(): Object {
    if (this.arrowVisible) {
      return { 'left.px': this.getCurrentTileX, visibility: 'visible' }
    }
    else {
      return { visibility: 'hidden' }
    }
  }

  changeColour(i: number) {
     if(!this.gameEnd){
    var col = i % 7;
    //var row = Math.floor(i / 7);
    var row = this.getNextOpenRow(this.board, col);
    console.log("Row and Column " + row + " " + col + " " + this.rowIndextoSit[col]);

    if (this.currentTurnPlayer) {
      // this.drop(row, col);
      this.currentTurnPlayer = false;
      this.turn = "Bot";
      this.turnCoin = this.turnCoin_url + "yellowCoin.png";
      console.log("Next turn is bot");
      this.whoseTurn[this.rowIndextoSit[col]] = 'player';
      console.log('calc tasmia: ', row);
      this.board[row][col] = this.HUMAN;

      if (this.winningMove(this.board, this.HUMAN)) {
        console.log("Player won");
        this.whoWon = 'Player';
        this.winningLine = 'Player Wins';
        this.gameEnd = true;
      }

      this.isFilled[this.rowIndextoSit[col]] = true;
      this.rowIndextoSit[col] -= 7;

      this.currentTurnNumber++;
      this.currentTurnPlayer = false;
      var that = this;
      setTimeout(function () {
        that.changeColour(0);
      }, 200);

    }
    else {
      this.currentTurnPlayer = true;
      this.turn = "Player";
      this.turnCoin = this.turnCoin_url + "redCoin.png";
      var result = this.minimax(this.board, this.difficulty, -Infinity, Infinity, true);
      col = result[0];
      if (this.isValidLocation(this.board, col)) {
        var row = this.getNextOpenRow(this.board, col);
        console.log('calc ai: ', row);
        this.whoseTurn[this.rowIndextoSit[col]] = 'bot';
        this.board[row][col] = this.AI;
        if (this.winningMove(this.board, this.AI)) {
          for(var i=0; i<4; i++){
            console.log(this.winningR[i] + " " + this.winningC[i]);
            console.log(35 - this.winningR[i] * 7 + this.winningC[i]);
            this.winning[35 - this.winningR[i] * 7 + this.winningC[i]] = true;
          }
          console.log('AI won');
          this.whoWon = 'AI';
          this.winningLine = 'AI Wins';
          this.gameEnd = true;
        }
        this.isFilled[this.rowIndextoSit[col]] = true;
        this.rowIndextoSit[col] -= 7;
        this.currentTurnNumber++;

        console.log("Whose turn "+ this.whoseTurn[this.rowIndextoSit[col]] + " "+ this.isFilled[this.rowIndextoSit[col]]);
      }

    }
    }
  }

  async drop(row: number, col: number) {
    for (var index = col; index < 42; index += 7) {
      console.log("Droppingg... " + index);
      this.turnCoin = this.turnCoin_url + "yellowCoin.png";
      // this.isFilled[this.rowIndextoSit[index]] = true;
      // this.whoseTurn[this.rowIndextoSit[index]] = 'player';
      await this.delay(3000);
      this.turnnn();
    }
  }

  turnnn() {
    this.turnCoin = this.turnCoin_url + "redCoin.png";
    // this.isFilled[this.rowIndextoSit[index]] = false;
    console.log("Droppingg Slleepppp..." + this.turnCoin);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setStarter(input: number) {
    this.whoseTurn_visible = false;
    this.isError = false;
    this.invisible = false;
    console.log("whoo " + this.whoseTurn_visible + " " + input);
    if (input == 0) {
      this.currentTurnPlayer = true;
    }
    else if(input==1) {
      this.currentTurnPlayer = false;
      this.changeColour(0);
    }
  }




  winningMove(board: number[][], piece: number) {
    for (var c = 0; c < this.COL_COUNT - 3; c++) {
      for (var r = 0; r < this.ROW_COUNT; r++) {
        //horizontal check
        if(piece!=0){
          if (board[r][c] == piece && board[r][c + 1] == piece && board[r][c + 2] == piece && board[r][c + 3] == piece) {
          // col_count * r + c
        
          for(var i=0; i<4; i++){
            this.winningC[i] = c + i;
            this.winningR[i] =  r;
          }

          return true;
        }
        }
      }
    }

    //vertical move
    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT; c++) {
        if (board[r][c] == piece && board[r + 1][c] == piece && board[r + 2][c] == piece && board[r + 3][c] == piece) {
          for(var i=0; i<4; i++){
            this.winningC[i] = c;
            this.winningR[i] =  r + i;
          }
          return true;
        }
      }
    }


    //pos diagonal move
    for (var r = 0; r < this.ROW_COUNT - 3; r++) {
      for (var c = 0; c < this.COL_COUNT - 3; c++) {
        if (board[r][c] == piece && board[r + 1][c + 1] == piece && board[r + 2][c + 2] == piece && board[r + 3][c + 3] == piece) {
          for(var i=0; i<4; i++){
            this.winningC[i] = c + i;
            this.winningR[i] =  r + i;
          }
          return true;
        }
      }
    }

    //neg diagonal move
    for (var c = 0; c < this.COL_COUNT - 3; c++) {
      for (var r = 3; r < this.ROW_COUNT; r++) {
        if (board[r][c] == piece && board[r - 1][c + 1] == piece && board[r - 2][c + 2] == piece && board[r - 3][c + 3] == piece) {
          for(var i=0; i<4; i++){
            this.winningC[i] = c + i;
            this.winningR[i] =  r - i;
          }
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

  scoreForCurrentPosition(board: number[][], curPlayer: number): number {
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


  minimax(board: number[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number[] {
    var validLocations = this.validMove(board);
    var is_terminal = this.isTerminal(board);
    if (depth == 0 || is_terminal) {
      if (is_terminal) {
        if (this.winningMove(board, this.AI)) {
          //-1 means game is over, no valid moves left
          return [-1, 10000000];
        }
        else if (this.winningMove(board, this.HUMAN)) {
          return [-1, -10000000];
        }
        else {
          return [-1, 0];
        }
      }
      else {
        return [-1, this.scoreForCurrentPosition(board, this.AI)];
      }
    }
    if (maximizingPlayer) {
      var value = -Infinity;
      var column = validLocations[0];
      var row = 0;
      this.tempBoard = [[]];
      for (var i = 0; i < validLocations.length; i++) {
        var col = validLocations[i];
        row = this.getNextOpenRow(board, col);
        this.tempBoard = JSON.parse(JSON.stringify(board));
        this.tempBoard[row][col] = this.AI;
        var new_score = this.minimax(this.tempBoard, depth - 1, alpha, beta, false);
        if (new_score[1] > value) {
          value = new_score[1];
          column = col;
        }
        if (value > alpha) alpha = value;
        if (alpha >= beta) break;
      }
      return [column, value];
    }

    else {
      var value = Infinity;
      var column = validLocations[0];
      var row = 0;
      this.tempBoard = [[]];
      for (var i = 0; i < validLocations.length; i++) {
        var col = validLocations[i];
        row = this.getNextOpenRow(board, col);
        this.tempBoard = JSON.parse(JSON.stringify(board));
        this.tempBoard[row][col] = this.HUMAN;
        var new_score = this.minimax(this.tempBoard, depth - 1, alpha, beta, true);
        if (new_score[1] < value) {
          value = new_score[1];
          column = col;
        }
        if (value < beta) beta = value;
        if (alpha >= beta) break;
      }
      return [column, value];
    }
  }

  bestMove(board: number[][], curPlayer: number) {
    var validLocations = this.validMove(board);
    var best_score = -Infinity;
    var best_col = validLocations[0];
    for (var i = 0; i < validLocations.length; i++) {
      var col = validLocations[i];
      var row = this.getNextOpenRow(board, col);
      this.tempBoard = JSON.parse(JSON.stringify(board));
      this.tempBoard[row][col] = curPlayer;
      var score = this.scoreForCurrentPosition(this.tempBoard, curPlayer);
      if (score >= best_score) {
        best_score = score;
        best_col = col;
      }
    }
    return best_col;
  }

}
