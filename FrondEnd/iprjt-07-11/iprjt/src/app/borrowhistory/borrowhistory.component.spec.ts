import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowhistoryComponent } from './borrowhistory.component';

describe('BorrowhistoryComponent', () => {
  let component: BorrowhistoryComponent;
  let fixture: ComponentFixture<BorrowhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
