import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generating-questions-loader',
  templateUrl: './generating-questions-loader.component.html',
  styleUrls: ['./generating-questions-loader.component.scss']
})
export class GeneratingQuestionsLoaderComponent implements OnInit {

  @Input('showInstructions')
  showInstructions: boolean = false;

  @Input('generatingQuestions')
  generatingQuestions: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
