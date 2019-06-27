import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDataPageComponent } from './update-data-page.component';

describe('UpdateDataPageComponent', () => {
  let component: UpdateDataPageComponent;
  let fixture: ComponentFixture<UpdateDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
