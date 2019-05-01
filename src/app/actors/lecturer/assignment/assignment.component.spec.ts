import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerAssignmentComponent } from './assignment.component';

describe('AssignmentComponent', () => {
  let component: LecturerAssignmentComponent;
  let fixture: ComponentFixture<LecturerAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
