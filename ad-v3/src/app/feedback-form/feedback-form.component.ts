import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  feedback = {
    rating: '2',
    comments: ''
  };


}
