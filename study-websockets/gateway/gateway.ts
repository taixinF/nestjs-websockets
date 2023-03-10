import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'Socket.io';
import { OnModuleInit } from '@nestjs/common';

//通常情况下他会和你的nest端口同步你也可以在这里传入 你先更改的
@WebSocketGateway()
//，OnModuleInit 是一个生命周期钩子函数，用于在模块初始化完成后执行一些操作。
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
