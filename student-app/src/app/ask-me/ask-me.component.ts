import { Component, Inject, OnInit } from '@angular/core';
import { AskMeService } from '../services/ask-me.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-me',
  templateUrl: './ask-me.component.html',
  styleUrls: ['./ask-me.component.scss']
})
export class AskMeComponent implements OnInit {

  query: string;
  answer: string;
  context: string = "";

  constructor(private askMeService: AskMeService,
              public matDialogRef: MatDialogRef<AskMeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.answer = "";
    this.context = this.data;
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

  close(){
    this.query = "";
    this.answer = "";
  }

}
