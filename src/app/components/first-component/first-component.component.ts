import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css'],
})
export class FirstComponentComponent implements OnInit {
  @Input() name: string;
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getInfo() {
    this.clicked.emit({ title: 'test', info: 'some info' });
  }
}
