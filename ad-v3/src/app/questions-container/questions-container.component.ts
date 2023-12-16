import { Component, OnDestroy, OnInit } from '@angular/core';
import { MCQQuestion } from '../models/question.model';
import { Subscription } from 'rxjs';
import { QuestionService } from '../services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionDialogComponent } from '../edit-question-dialog/edit-question-dialog.component';
import { QuestionFeedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.scss']
})
export class QuestionsContainerComponent implements OnInit, OnDestroy {

  current_question_feedback!: QuestionFeedback;

  current_question!: MCQQuestion;

  loading:boolean = false;

  selected_question_subscription: Subscription = new Subscription();

  constructor(private questionService: QuestionService, public feedbackService: FeedbackService, public dialog: MatDialog) { }

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

  ngOnDestroy(): void {
    this.selected_question_subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.questionService.loadQuestions();
    this.current_question = this.questionService.fetchCurrentQuestion();
    this.selected_question_subscription = this.questionService.question_subject.subscribe((question) => {
      this.current_question = question;
      this.loading = this.current_question == null;
      if(this.current_question.id)
        this.current_question_feedback = this.feedbackService.fetchFeedback(this.current_question?.id) ??  {
          comment: '',
          rating: '2',
        };
    })
  }

  capitalizeString(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  navigateToNextQuestion() {
    this.questionService.NavigateNext();
  }

  navigateToPrevQuestion() {
    this.questionService.NavigatePrev();
  }

  openEditDialog(): void {
    if(this.current_question && this.current_question.id) {}
    const dialogRef = this.dialog.open(EditQuestionDialogComponent,  {
      data: this.current_question,
      disableClose: true,
      height: '540px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result: MCQQuestion | undefined) => {
      if(!result) {
        return;
      } 
      if(this.current_question.id) {
        this.questionService.updateQuestion(this.current_question?.id, result);
      }
    });
  }

  saveFeedback(feedback: QuestionFeedback) {
    feedback.contextId = 1;
    feedback.questionId = this.current_question?.id ?? 0; 
    this.feedbackService.saveFeedback(feedback);
  }
}
