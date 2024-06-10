import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { Message } from './message.model';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ChatService', ['sendMessage', 'getMessage']);
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      providers: [{ provide: ChatService, useValue: spy }],
    }).compileComponents();

    chatServiceSpy = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send message and reset', () => {
    const mockMessage: Message = { message: 'Test message', received: false };
    component.message = mockMessage;
    component.sendMessage();

    expect(chatServiceSpy.sendMessage).toHaveBeenCalledWith({
      ...mockMessage,
      sender: jasmine.any(String),
      date: jasmine.any(Date),
      received: false,
    });
    expect(component.message).toEqual({ message: '', received: false });
  });

  it('should get messages', () => {
    const mockMessage: Message = { message: 'Test message', received: false };
    chatServiceSpy.getMessage.and.returnValue(of(mockMessage));

    component.getMessages();

    expect(component.messageList).toContain({ ...mockMessage, received: true });
  });
});
