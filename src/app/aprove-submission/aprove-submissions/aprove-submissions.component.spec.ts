import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AproveSubmissionsComponent } from './aprove-submissions.component';

describe('AproveSubmissionsComponent', () => {
  let component: AproveSubmissionsComponent;
  let fixture: ComponentFixture<AproveSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AproveSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AproveSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
