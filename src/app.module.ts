import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {MongooseModule } from '@nestjs/mongoose';
import {invitationSchema} from './schema/invitation.schema';
import {InvitationController} from './controller/invitation.controller';
import {InvitationService} from './services/invitation.service';

@Module({
  imports: [
    
    MongooseModule.forRoot("mongodb://localhost:27017/EO"),MongooseModule.forFeature([{
      name:'invitation',
      schema:invitationSchema,
      collection:'invitation'
    }])
  ],
  controllers: [AppController,InvitationController],
  providers: [AppService,InvitationService],
})
export class AppModule {}
