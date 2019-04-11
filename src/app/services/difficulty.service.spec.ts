/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DifficultyService } from './difficulty.service';

describe('Service: Difficulty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DifficultyService]
    });
  });

  it('should ...', inject([DifficultyService], (service: DifficultyService) => {
    expect(service).toBeTruthy();
  }));
});
