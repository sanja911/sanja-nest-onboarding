import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { Server } from 'ws';
import { map } from 'rxjs/operators';
@WebSocketGateway(8080)
export class AppGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');
  @SubscribeMessage('record')
  handleRecord(@MessageBody() client: any, payload: any): void {
    this.logger.log('client: ', client);
    this.logger.log('payload: ', payload);
    //return 'Hello world!';
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log('connected: ', client);
  }

  afterInit(server: any): any {
    this.logger.log('SignallingGateway initialized ', server);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`ClientDisconnect: ${client}`);
  }
  @SubscribeMessage('events')
  onEvent(
    @MessageBody() client: any,
    data: any,
  ): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
  @SubscribeMessage('event2')
  handleEvent(client: any, data: string): string {
    return data;
  }
}
// {"event":"events","data":{"text":"tes"}}
