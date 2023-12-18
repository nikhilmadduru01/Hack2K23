import { TestBed } from '@angular/core/testing';

import { AskMeService } from './ask-me.service';

describe('AskMeService', () => {
  let service: AskMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
