import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UIComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  i: number=0;
  tilesNumber: number = 42;

  counter(i: number) {
    return new Array(i);
}

}
