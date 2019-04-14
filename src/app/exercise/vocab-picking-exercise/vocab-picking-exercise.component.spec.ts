import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabPickingExerciseComponent } from './vocab-picking-exercise.component';

describe('VocabPickingExerciseComponent', () => {
  let component: VocabPickingExerciseComponent;
  let fixture: ComponentFixture<VocabPickingExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabPickingExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabPickingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
