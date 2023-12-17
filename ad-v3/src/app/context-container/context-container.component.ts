import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuestionContext } from '../models/context.model';
import { QuestionService } from '../services/question.service';
import { map } from 'rxjs';



@Component({
  selector: 'app-context-container',
  templateUrl: './context-container.component.html',
  styleUrls: ['./context-container.component.scss']
})
export class ContextContainerComponent implements OnInit {

  file!: File

  contextForm: string = '';

  @Input('generatingQuestions')
  generatingQuestions: boolean = false;


  @Output('context')
  contextEventEmitter : EventEmitter<QuestionContext> = new EventEmitter<QuestionContext>();

  placeholderText: string = 'Type in or paste any plain text content';

  constructor() {
  }

  get fileName(): string {
    return this.file?.name ?? "";
  }

  get fileSize(): string {
    return  this.file?.size ? `(${this.file?.size/100} KB)` : "";
  }

  get disableGenerateQuestions(): boolean {
    return !this.contextForm || this.contextForm.length < 1000 || this.generatingQuestions;
  }

  get fetchSubmitBtnText(): string {
    return this.generatingQuestions ? 'Generating...' : 'Generate Questions'
  }

  ngOnInit(): void {
  }

  async onFileUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const filecontent = e.target.result;
        console.log('File Conent: ', filecontent);

        this.contextForm = filecontent;
      }
      reader.readAsText(file);
    } else {
      console.error('No file selected.');
    }
  }

  generateQuestions() {
    if(!this.contextForm) {
      return;
    }
    this.contextEventEmitter.next({context: this.contextForm});
  }

   clearContext() {
    this.contextForm = '';
   }
}
