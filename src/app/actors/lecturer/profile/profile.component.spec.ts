import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: LecturerProfileComponent;
  let fixture: ComponentFixture<LecturerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
