import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessasageDtoComponent } from './chat-messasage-dto.component';

describe('ChatMessasageDtoComponent', () => {
  let component: ChatMessasageDtoComponent;
  let fixture: ComponentFixture<ChatMessasageDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessasageDtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessasageDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
