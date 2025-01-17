import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

// https://docs.nestjs.com/websockets/gateways#overview
@WebSocketGateway({
  transport: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  socket: Socket;

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    // update room
    const currentRoom = client.data.room;
    if (currentRoom !== room) {
      client.leave(currentRoom);
      client.data.room = room;
    }

    client.join(room);
    this.server.to(room).emit('joined', room);
  }

  // 'chat' event send the message back to all connected clients
  @SubscribeMessage('send')
  receive(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    // broadcast to current room
    const currentRoom = client.data.room;
    this.server.to(currentRoom).emit('broadcast', data);
    return data;
  }

  @SubscribeMessage('broadcast')
  broadcast(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('echo2')
  echoString2(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    if (data.length < 10) {
      client.emit('broadcast', this.broadcast(data));
    }
    return data + data;
  }

  @SubscribeMessage('echo3')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'events';
    return { event, data };
  }

  // https://docs.nestjs.com/websockets/gateways#asynchronous-responses
  @SubscribeMessage('events')
  findAll(@MessageBody() data: object): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody('id') id: number): Promise<number> {
    // id === messageBody.id
    return id;
  }

  // without decorators (not recommended)
  // because it requires mocking the socket instance in each unit test
  // @SubscribeMessage('events')
  // handleEvent(client: Socket, data: string): string {
  //   return data;
  // }
}
