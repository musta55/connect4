import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-who-starts',
  templateUrl: './who-starts.component.html',
  styleUrls: ['./who-starts.component.css']
})
export class WhoStartsComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
  }

  goTOUI(input:number) {
    this.gameService.setPlayer(input);
    this.router.navigateByUrl('game');
  }

}
