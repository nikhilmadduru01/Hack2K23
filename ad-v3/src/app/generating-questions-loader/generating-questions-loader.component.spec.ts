import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingQuestionsLoaderComponent } from './generating-questions-loader.component';

describe('GeneratingQuestionsLoaderComponent', () => {
  let component: GeneratingQuestionsLoaderComponent;
  let fixture: ComponentFixture<GeneratingQuestionsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratingQuestionsLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratingQuestionsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
