import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectrequestComponent } from './rejectrequest.component';

describe('RejectrequestComponent', () => {
  let component: RejectrequestComponent;
  let fixture: ComponentFixture<RejectrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
