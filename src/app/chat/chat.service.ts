import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket
  ) { }

  sendMessage(msg: Message) {
    //Emitting Message
    this.socket.emit('message', msg);
  }

  getMessage() {
    //Getting Message
    return new Observable((observer: Observer<any>) => {
      this.socket.on('message', (message: string) => {
        console.log(message);
        
        observer.next(message)
      })
    })
  }
}
