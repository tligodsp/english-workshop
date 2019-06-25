import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataPageComponent } from './create-data-page.component';

describe('CreateDataPageComponent', () => {
  let component: CreateDataPageComponent;
  let fixture: ComponentFixture<CreateDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
