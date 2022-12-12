import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminprofileComponent } from './view-adminprofile.component';

describe('ViewAdminprofileComponent', () => {
  let component: ViewAdminprofileComponent;
  let fixture: ComponentFixture<ViewAdminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
