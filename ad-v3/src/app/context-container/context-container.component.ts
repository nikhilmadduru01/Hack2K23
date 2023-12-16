import { Component, OnInit } from '@angular/core';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-context-container',
  templateUrl: './context-container.component.html',
  styleUrls: ['./context-container.component.scss']
})
export class ContextContainerComponent implements OnInit {
  public Editor: any = ClassicEditor;
  public isDisabled = false;

  file!: File


  public editorData = `<p><a href="https://yandex.ru/">https://yandex.ru/</a></p>`;

  config: any = { toolbar: ['heading', '|', 'bold', 'italic'] }

  constructor() { }

  get fileName(): string {
    return (this.file) ? (this.file?.name + ` (${this.file?.size/100} KB)`) : '';
  }

  ngOnInit(): void {
  }

  async onFileUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    } else {
      console.error('No file selected.');
    }
  }
}
