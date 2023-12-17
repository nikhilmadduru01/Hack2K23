import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-generating-questions-loader',
  templateUrl: './generating-questions-loader.component.html',
  styleUrls: ['./generating-questions-loader.component.scss', '../utility/colors.scss']
})
export class GeneratingQuestionsLoaderComponent implements OnChanges {

  @Input('showInstructions')
  showInstructions: boolean = false;

  @Input('generatingQuestions')
  generatingQuestions: boolean = false;

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.generatingQuestions)
      this.spinnerService.show();
  }
}
