import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerEditCourseDetailComponent } from './edit-course-detail.component';

describe('EditCourseDetailComponent', () => {
  let component: LecturerEditCourseDetailComponent;
  let fixture: ComponentFixture<LecturerEditCourseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerEditCourseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerEditCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
