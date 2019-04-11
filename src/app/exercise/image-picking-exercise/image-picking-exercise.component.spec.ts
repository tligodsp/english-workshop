import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePickingExerciseComponent } from './image-picking-exercise.component';

describe('ImagePickingExerciseComponent', () => {
  let component: ImagePickingExerciseComponent;
  let fixture: ComponentFixture<ImagePickingExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePickingExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePickingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
