import { Component } from '@angular/core';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  query: string = '';

  topicTitle!: string;
  content!: string;

  generationInProgress: boolean = false;

  dataFetchedOnce: boolean = false;

  get disableBtn(): boolean {
    return !this.query;
  }

  constructor(public questionService: QuestionService) {

  }

  public generateQuiz() {
    if(!this.query) {
      return;
    }
    this.generationInProgress = true;
    this.questionService.generate_questions_content(this.query).subscribe((data) => {
      console.log(data);
      this.topicTitle = data.topic;
      this.content = data.passage;
      this.questionService.loadQuestions(data.questions);
      this.generationInProgress  = false;
      this.dataFetchedOnce = true;
    },
    (err) => {
      this.generationInProgress  = false;
      this.dataFetchedOnce = false;
    })
  }
}
