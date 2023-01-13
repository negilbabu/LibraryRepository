import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptrequestComponent } from './acceptrequest.component';

describe('AcceptrequestComponent', () => {
  let component: AcceptrequestComponent;
  let fixture: ComponentFixture<AcceptrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
