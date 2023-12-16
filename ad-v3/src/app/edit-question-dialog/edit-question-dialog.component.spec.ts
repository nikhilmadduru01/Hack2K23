import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionDialogComponent } from './edit-question-dialog.component';

describe('EditQuestoinDialogComponent', () => {
  let component: EditQuestionDialogComponent;
  let fixture: ComponentFixture<EditQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
