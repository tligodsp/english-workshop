import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureTranslatingComponent } from './picture-translating.component';

describe('PictureTranslatingComponent', () => {
  let component: PictureTranslatingComponent;
  let fixture: ComponentFixture<PictureTranslatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureTranslatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureTranslatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
