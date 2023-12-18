import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {

  @Input('title')
  title: string = 'Title';

  @Input('content')
  content: string = 'Content';

  constructor() { }

  ngOnInit(): void {
  }

}
