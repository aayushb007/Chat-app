import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  
  messageList: Message[] = [];
  message: Message = {};
  dateNow: Date = new Date();

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  //Send Message on Submit Chat
  sendMessage() {
     this.message ={
      ...this.message,
      sender: 'Anonymous :)',
      date: this.dateNow,
      received: true 
    };

    this.chatService.sendMessage(this.message)
    this.message = { message: '' , received: true  }; // Reset the message object with an empty message
   
   
  }

  getMessages() {
    this.chatService.getMessage().subscribe((message: Message)=> {
      message.received = true;
      this.messageList.push(message);
    })
  }
}
