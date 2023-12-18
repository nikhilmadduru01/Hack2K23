import { Component, OnInit } from '@angular/core';
import { QuestionFeedback } from 'src/app/models/feedback.model';
import { MCQQuestion } from 'src/app/models/question.model';
import { Subscription } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';
import { QuestionService } from 'src/app/services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  current_question!: MCQQuestion;

  showAnswers: boolean = false;

  current_question_feedback!: QuestionFeedback;

  selected_question_subscription: Subscription = new Subscription();
  
  public get current_question_id(): number {
    return this.questionService.fetchCurrentIndex() + 1;
  }

  public get disable_prev_btn(): boolean {
    return this.questionService._current_index <= 0;
  }

  public get disable_next_btn(): boolean {
    return this.questionService._current_index + 1 == this.questionService.fetchQuestionLength();
  }

  public get question_length(): number {
    return this.questionService.fetchQuestionLength();
  }

  constructor(private questionService: QuestionService, private feedbackService: FeedbackService, private snackbar: MatSnackBar) { }

  capitalizeString(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  navigateToNextQuestion() {
    this.questionService.NavigateNext();
  }

  navigateToPrevQuestion() {
    this.questionService.NavigatePrev();
  }

  ngOnInit(): void {
    this.current_question = this.questionService.fetchCurrentQuestion();
    this.current_question_feedback = {
      comment: '',
      rating: '2'
    }
    this.selected_question_subscription = this.questionService.question_subject.subscribe((question) => {
      this.current_question = question;
      if(this.current_question.id)
        this.current_question_feedback = this.feedbackService.fetchFeedback(this.current_question?.id) ??  {
          comment: '',
          rating: '2',
        };
    })
  }

  saveFeedback(feedback: QuestionFeedback) {
    feedback.contextId = 1;
    feedback.questionId = this.current_question?.id ?? 0; 
    this.feedbackService.saveFeedback(feedback);
    this.openFeedbackSubmittedSnackbar();
  }

  openFeedbackSubmittedSnackbar() {
    let message = "Feedback submitted successfully";
    this.snackbar.open(message, undefined, {
     duration: 2000
    });
   }

}
