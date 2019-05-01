import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSheetComponent } from './assignment-sheet.component';

describe('AssignmentSheetComponent', () => {
  let component: AssignmentSheetComponent;
  let fixture: ComponentFixture<AssignmentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
