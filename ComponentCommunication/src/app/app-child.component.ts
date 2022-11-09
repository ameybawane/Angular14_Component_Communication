import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-child',
  templateUrl: './app-child.component.html',
  styleUrls: ['./app-child.component.css']
})
export class AppChildComponent implements OnInit {

  constructor() { }
  @Input()
  pString!: string;

  @Output()
  childString: EventEmitter<string> = new EventEmitter<string>();
  sendData() {
    this.childString.emit("String from child component.");
  }
  ngOnInit(): void {
  }

}
