import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerCoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: LecturerCoursesComponent;
  let fixture: ComponentFixture<LecturerCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
