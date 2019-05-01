import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDialogComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsDialogComponent;
  let fixture: ComponentFixture<NewsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
