import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { jwtConstants } from 'src_config/jwt.config';
import * as url from "url"
import * as socketioJwt from 'socketio-jwt';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  private clientsArr: any[] = [];

  constructor() {

  }

  afterInit(): void {
    this.server.use(socketioJwt.authorize({
      secret: jwtConstants.secret,
      handshake: true
    }));
  }


  handleConnection(client) {
    console.log('有人链接了' + client.id, client.decoded_token.name);
  }

  handleDisconnect(client) {
    console.log('有人走了' + client.id);
  }

  @SubscribeMessage('addCart')
  addCart(client: any, payload: any) {
    console.log(payload);
    var roomid = url.parse(client.request.url, true).query.roomid;   /*获取房间号 获取桌号*/
    client.join(roomid);
    console.log(roomid);
    // this.server.to(roomid).emit('addCart','Server AddCart Ok');    //广播所有人包含自己
    client.broadcast.to(roomid).emit('addCart', new Date());   //不包括自己
  }

}

  // @SubscribeMessage('events')
  // handleEvent(@MessageBody() data: string): string {
  //   return data;
  // }
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }