import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindbyCategoryComponent } from './findby-category.component';

describe('FindbyCategoryComponent', () => {
  let component: FindbyCategoryComponent;
  let fixture: ComponentFixture<FindbyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindbyCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindbyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
