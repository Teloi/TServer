import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import * as url from "url"

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server;

  private clientsArr: any[] = [];

  handleConnection(client: any,) {
    console.log('有人链接了' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('有人走了' + client.id);
  }

  @SubscribeMessage('addCart')
  addCart(client: any, payload: any) {
    console.log(client)
    console.log(payload);
    var roomid = url.parse(client.request.url, true).query.roomid;   /*获取房间号 获取桌号*/
    client.join(roomid);
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