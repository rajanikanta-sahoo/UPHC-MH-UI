import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataAvlComponent } from './no-data-avl.component';

describe('NoDataAvlComponent', () => {
  let component: NoDataAvlComponent;
  let fixture: ComponentFixture<NoDataAvlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataAvlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataAvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
