import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailviewComponent } from './user-detailview.component';

describe('UserDetailviewComponent', () => {
  let component: UserDetailviewComponent;
  let fixture: ComponentFixture<UserDetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
