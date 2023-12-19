import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { map } from 'rxjs';
import { QuestionContext } from '../models/context.model';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(private questionService: QuestionService) { }

  generating_questions = false;

  questionGeneratedOnce = false;

  ngOnInit(): void {
  }

  generateQuestions(data: QuestionContext): void {
    this.generating_questions = true;
    this.questionService.generate_questions(data.context)
      .pipe(
        map((data) => {
          data.map((question, index) => {
            question.id = index + 1;
            let ques_len = question.options.length;
            if(ques_len != 4) {
              let options = ['A','B','C','D'];
              for(let i = ques_len - 1 ; i < 4;i++) {
                question.options[i] = {
                  optionId: options[i],
                  optionValue: "Update the option"
                };
              }
            }
          });
          return data;
        })
      ).subscribe(
        (data) => { 
          if(data) {
            this.questionService.loadQuestions(data); 
            this.questionGeneratedOnce = true;
          }
          this.generating_questions = false;
        }
      )
  }

}
