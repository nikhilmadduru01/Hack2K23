import { Injectable } from '@angular/core';
import { MCQQuestion } from '../models/question.model';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  question_subject: Subject<MCQQuestion> = new Subject<MCQQuestion>();
  _current_index: number = 0;

  _flaskUrl: string = "http://127.0.0.1:5000/generate_qa";

  mockDataUrl: string = '../../assets/data/generated_questions.json';

  _generated_question_list: MCQQuestion[] = [];

  constructor(private httpClient: HttpClient) {
  }


  setQuestion(index: number): void {
    let selectedQuestion = this._generated_question_list.slice()[index];
    this.question_subject.next(selectedQuestion);
  }

  NavigateNext(): void {
    if (this._current_index + 1 >= this._generated_question_list.length) {
      return;
    }
    else {
      this._current_index = this._current_index + 1;
      this.setQuestion(this._current_index);
    }
  }

  NavigatePrev(): void {
    if (this._current_index <= 0) {
      return;
    }
    else {
      this._current_index = this._current_index - 1
      this.setQuestion(this._current_index);
    }
  }

  fetchQuestionLength(): number {
    return this._generated_question_list.length;
  }

  fetchCurrentIndex(): number {
    return this._current_index;
  }

  fetchCurrentQuestion(): MCQQuestion {
    return this._generated_question_list.slice()[this._current_index];
  }

  // loadQuestions(): void {
  //   this.httpClient.get<MCQQuestion[]>(this.mockDataUrl).pipe(
  //     map((data) => {
  //       data.map((question, index) => question.id = index + 1);
  //       return data;
  //     })
  //   ).subscribe(
  //     res => {
  //       this._generated_question_list = res;
  //       this.setQuestion(0);
  //     }
  //   )
  // }

  generate_questions(context:string, question_count: number = 5): Observable<MCQQuestion[]> {
    let payload = {
      context: context,
      question_count: question_count,
    }
    return this.httpClient.post<MCQQuestion[]>(this._flaskUrl, payload);
  }

  loadQuestions(question_list: MCQQuestion[]): void {
    this._current_index = 0;
    this._generated_question_list = question_list;
  }

  updateQuestion(questionId: number, question: MCQQuestion) {
    let index = this._generated_question_list.findIndex(question => question.id === questionId);
    this._generated_question_list[index] = question;
    this.setQuestion(index);
  }
}
