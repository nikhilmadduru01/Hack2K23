import { Component, OnDestroy, OnInit } from '@angular/core';
import { MCQQuestion } from '../models/question.model';
import { Subscription } from 'rxjs';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.scss']
})
export class QuestionsContainerComponent implements OnInit, OnDestroy {


  current_question!: MCQQuestion;

  loading:boolean = false;

  selected_question_subscription: Subscription = new Subscription();

  constructor(private questionService: QuestionService) { }

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
    this.loading = false;
    console.log(this.current_question);
    this.selected_question_subscription = this.questionService.question_subject.subscribe((question) => {
      console.log("SUB");
      this.current_question = question;
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



}
