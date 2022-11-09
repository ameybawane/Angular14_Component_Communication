# Angular14_Component_Communication

Component Interaction in Angular
As we know that, Angular is a component based approach, what good would it be if we cannot completely use this feature of interaction between components to make life easier.

But, before we can talk about this feature let us deeply focus on the structures occurring in angular application and their component-relationships. And it is a very important topic to understand how to structure our Angular application. The way to structure your angular application cannot be taught but only be caught as you evolve yourself as an angular developer. In the below image you can see one such structure in an Angular application for a general scenario.

Relationships in Angular
you can figure out much relations from this scenario.
So, visualizing the above scenario, there are four different ways of sharing/sending/interacting data to and fro different components.

Parent to Child: Sharing Data via Input
This is probably the most common and straightforward method of sharing data. It works by using the @Input() decorator to allow data to be passed via the template. I will also show the way it is written in angular application to make it work

Parent.component.ts
import { Component } from ‘@angular/core’;
@Component({
 selector: ‘app-parent’,
 template: `
 <app-child [childMessage]=”parentMessage”></app-child>
 `,
 styleUrls: [‘./parent.component.css’]
})
export class ParentComponent{
 parentMessage = “message from parent”
 constructor() { }
}
Child.component.ts
import { Component, Input } from ‘@angular/core’;
@Component({
 selector: ‘app-child’,
 template: `
 Say {{ message }}
 `,
 styleUrls: [‘./child.component.css’]
})
export class ChildComponent {
 @Input() childMessage: string;
 constructor() { }
}
Child to Parent: Sharing Data via ViewChild
ViewChild allows a one component to be injected into another, giving the parent access to its attributes and functions. One caveat, however, is that child won’t be available until after the view has been initialized. This means we need to implement the AfterViewInit lifecycle hook to receive the data from the child.

Parent.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-parent',
  template: `
    Message: {{ message }}
    <app-child></app-child>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {

  @ViewChild(ChildComponent) child;

  constructor() { }

  message:string;

  ngAfterViewInit() {
    this.message = this.child.message
  }
}
child.component.ts
import { Component} from ‘@angular/core’;
@Component({
 selector: ‘app-child’,
 template: `
 `,
 styleUrls: [‘./child.component.css’]
})
export class ChildComponent {
 message = ‘Hello There!’;
 constructor() { }
}
Child to Parent: Sharing Data via Output() and EventEmitter
Another way to share data is to emit data from the child, which can be listed to by the parent. This approach is ideal when you want to share data changes that occur on things like button clicks, form entires, and other user events.

In the parent, we create a function to receive the message and set it equal to the message variable.

In the child, we declare a messageEvent variable with the Output decorator and set it equal to a new event emitter. Then we create a function named sendMessage that calls emit on this event with the message we want to send. Lastly, we create a button to trigger this function.

The parent can now subscribe to this messageEvent that’s outputted by the child component, then run the receive message function whenever this event occurs.

Parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    Message: {{message}}
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  constructor() { }

  message:string;

  receiveMessage($event) {
    this.message = $event
  }
}
child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
      <button (click)="sendMessage()">Send Message</button>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  message: string = "Hola Mundo!"

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage() {
    this.messageEvent.emit(this.message)
  }
}
