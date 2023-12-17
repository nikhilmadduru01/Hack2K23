import { Component, Inject, OnInit } from '@angular/core';
import { MCQQuestion, MCQQuestionOption } from '../models/question.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.scss']
})
export class EditQuestionDialogComponent implements OnInit {

  questionForm!: FormGroup; 

  constructor(public dialogRef: MatDialogRef<EditQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MCQQuestion,
    public fb: FormBuilder
  ) { 
    this.questionForm = this.fb.group({
      questionText: this.fb.control(this.data.questionText),
      aliases1: this.fb.array([this.fb.control(this.capitalizeString(this.data?.options[0]?.optionValue) ?? ''), this.fb.control(this.capitalizeString(this.data?.options[1]?.optionValue) ?? '')]),
      aliases2: this.fb.array([this.fb.control(this.capitalizeString(this.data?.options[2]?.optionValue) ?? ''), this.fb.control(this.capitalizeString(this.data?.options[3]?.optionValue) ?? '')]), 
      correctOption: this.fb.control(this.data.correctOption)
    })
  }

  get disableSaveBtn() {
    return this.questionForm.invalid || this.questionForm.pristine;
  }

  get aliases1keys(): string[] {
    return this.data.options.slice(0,2).map(opt => opt.optionId);
  }

  get aliases2keys(): string[] {
    return this.data.options.slice(2,4).map(opt => opt.optionId);
  }


  get aliases1() {
    return this.questionForm.get('aliases1') as FormArray;
  }

  get aliases2() {
    return this.questionForm.get('aliases2') as FormArray;
  }

  public getupdatedOptionsMap() {
    let updated_option_map: MCQQuestionOption[] = [];

    this.aliases1.controls.forEach((control,index) => {
      updated_option_map.push({
        optionId: this.aliases1keys[index],
        optionValue: control.value
      })
    });
    this.aliases2.controls.forEach((control,index) => {
      updated_option_map.push({
        optionId: this.aliases2keys[index],
        optionValue: control.value
      })
    });

    return updated_option_map;
  }

  fetchCorrectAnswer() {
    return this.getupdatedOptionsMap().find(
      opt => opt.optionId === this.questionForm.get('correctOption')?.value
    )?.optionValue;
  }

  ngOnInit(): void {
  }

  capitalizeString(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  saveQuestion() {
    if(this.questionForm.invalid || this.questionForm.pristine) {
      return;
    }

    let options = this.getupdatedOptionsMap();
    let correct_option = this.questionForm.get('correctOption')?.value;
    let question: MCQQuestion = {
      id: this.data.id,
      questionText: this.questionForm.get('questionText')?.value,
      options: options,
      correctOption: correct_option,
      answer: options.find(opt => opt.optionId === correct_option)?.optionValue ?? 'Answer Error'
    }

    if(!question) {
      return;
    }
    this.dialogRef.close(question);
  }

  close() {
    this.dialogRef.close(undefined);
  }

}
