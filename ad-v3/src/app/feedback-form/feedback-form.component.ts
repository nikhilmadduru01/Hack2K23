import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionFeedback } from '../models/feedback.model';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  @Input('feedback')
  feedback!: QuestionFeedback;

  @Output('saveFeedback')
  feedbackEmitter: EventEmitter<QuestionFeedback> = new EventEmitter<QuestionFeedback>();
  
  constructor() { }

  ngOnInit(): void {
  }

  saveFeedBack() {
    this.feedbackEmitter.next(this.feedback);
  }


}
