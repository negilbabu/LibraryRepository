import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowDetailViewComponent } from './borrow-detail-view.component';

describe('BorrowDetailViewComponent', () => {
  let component: BorrowDetailViewComponent;
  let fixture: ComponentFixture<BorrowDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
