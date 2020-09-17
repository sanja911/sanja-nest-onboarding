import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {MongooseModule } from '@nestjs/mongoose';
import {invitationSchema,historySchema} from './modules/schema/invitation.schema';
import {userSchema} from './modules/schema/user.schema';
import {OrganizationSchema} from './modules/schema/organization.schema';
import {InvitationController} from './modules/controller/invitation.controller';
import {InvitationService} from './modules/services/invitation.service';
import {HistoryService} from './modules/services/history.service';


@Module({
  imports: [
    
    MongooseModule.forRoot("mongodb://localhost:27017/EO"),MongooseModule.forFeature([{
      name:'invitation',
      schema:invitationSchema,
      collection:'invitation'
    },{
      name:'history',
      schema:historySchema,
      collection:'history'
    }/*,{
      name:'users',
      schema:userSchema,
      collection:'users'
    },{
      name:'organizations',
      schema:OrganizationSchema,
      collection:'organizations'
    }*/])
  ],
  controllers: [AppController,InvitationController],
  providers: [AppService,InvitationService,HistoryService],
})
export class AppModule {}
