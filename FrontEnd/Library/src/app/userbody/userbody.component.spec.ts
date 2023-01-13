import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbodyComponent } from './userbody.component';

describe('UserbodyComponent', () => {
  let component: UserbodyComponent;
  let fixture: ComponentFixture<UserbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
