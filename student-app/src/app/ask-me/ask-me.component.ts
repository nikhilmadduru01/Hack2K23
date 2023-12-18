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
  context: string;

  constructor(private askMeService: AskMeService) { }

  ngOnInit(): void {
    this.answer = "";
    this.context = ""
  }

  onSubmit() {
    this.askMeService.getAnswer(this.query, this.context).subscribe( data => {
      if(data){
        this.answer = data;
      }
      else{
        this.answer = "This question is not related to this content! Please ask other questions"
      }
    });
  }

}
