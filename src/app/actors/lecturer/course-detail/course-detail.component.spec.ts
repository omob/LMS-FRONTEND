import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerCourseDetailComponent } from './course-detail.component';

describe('CourseDetailComponent', () => {
  let component: LecturerCourseDetailComponent;
  let fixture: ComponentFixture<LecturerCourseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerCourseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
