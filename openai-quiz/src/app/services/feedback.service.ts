import { Injectable } from '@angular/core';
import { QuestionFeedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  _feedBackList: QuestionFeedback[] = [];

  constructor() { }

  saveFeedback(feedback: QuestionFeedback) {
    let index = this._feedBackList.findIndex(fd => fd.questionId === feedback.questionId);
    if(index > -1)
      this._feedBackList[index] = feedback;
    else
      this._feedBackList.push(feedback);
  }

  fetchFeedback(questionId: number) {
    return this._feedBackList.find(fd => fd.questionId === questionId);
  }
}
