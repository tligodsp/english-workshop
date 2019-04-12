import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceTranslatingComponent } from './sentence-translating.component';

describe('SentenceTranslatingComponent', () => {
  let component: SentenceTranslatingComponent;
  let fixture: ComponentFixture<SentenceTranslatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentenceTranslatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceTranslatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
