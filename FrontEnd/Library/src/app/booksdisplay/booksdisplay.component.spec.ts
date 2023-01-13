import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksdisplayComponent } from './booksdisplay.component';

describe('BooksdisplayComponent', () => {
  let component: BooksdisplayComponent;
  let fixture: ComponentFixture<BooksdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
