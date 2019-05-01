import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerEditProfileComponent } from './edit-profile.component';

describe('EditProfileComponent', () => {
  let component: LecturerEditProfileComponent;
  let fixture: ComponentFixture<LecturerEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
