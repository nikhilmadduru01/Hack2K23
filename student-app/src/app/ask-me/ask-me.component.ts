import { Component, OnInit } from '@angular/core';
import { AskMeService } from '../services/ask-me.service';

@Component({
  selector: 'app-ask-me',
  templateUrl: './ask-me.component.html',
  styleUrls: ['./ask-me.component.scss']
})
export class AskMeComponent implements OnInit {

  query: string;
  answer: string;

  constructor(private askMeService: AskMeService) { }

  ngOnInit(): void {
    this.answer = "";
  }

  onSubmit() {
    this.askMeService.getAnswer(this.query).subscribe( data => {
      if(data){
        this.answer = data;
      }
      else{
        this.answer = "This question is not related to this content! Please ask other questions"
      }
    });
  }

}
