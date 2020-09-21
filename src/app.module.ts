import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {MongooseModule } from '@nestjs/mongoose';
import {InvitationModule} from './modules/invitations/invitation.module'

@Module({
  imports: [
    InvitationModule,
    MongooseModule.forRoot("mongodb://localhost:27017/EO"),
    
  ],
  // /controllers: [AppController,InvitationController],
  //providers: [AppService,InvitationService,HistoryService],
})
export class AppModule {}
