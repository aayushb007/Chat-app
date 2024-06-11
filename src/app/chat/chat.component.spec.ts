import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { Message } from './message.model';
import { FormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ChatService', ['sendMessage', 'getMessage']);
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule],
      providers: [{ provide: ChatService, useValue: spy }],
    }).compileComponents();

    chatServiceSpy = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    
    // Define the default return value for getMessage spy
    chatServiceSpy.getMessage.and.returnValue(of([]));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send message and reset', () => {
    const mockMessage: Message = { message: 'Test message', received: true };
    component.message = mockMessage;
    component.sendMessage();

    expect(chatServiceSpy.sendMessage).toHaveBeenCalledWith({
      ...mockMessage,
      sender: 'Anonymous :)',
      date: jasmine.any(Date),
      received: true,
    });
    expect(component.message).toEqual({ message: '', received: true });
  });

  it('should get messages', () => {
    const mockMessage: Message[] = [{ message: 'Test message', received: true }];
    chatServiceSpy.getMessage.and.returnValue(of([mockMessage]));

    component.getMessages();
    const expected:any = mockMessage.map(msg => ({ ...msg, received: true }));
     expect(component.messageList).toContain(expected);
  });
});
