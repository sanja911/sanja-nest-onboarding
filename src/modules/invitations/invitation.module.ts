import { Module } from '@nestjs/common';
import {MongooseModule } from '@nestjs/mongoose';
import {invitationSchema,historySchema} from './schema/invitation.schema';
import {InvitationController} from './controller/invitation.controller';
import {InvitationService} from './services/invitation.service';
import {HistoryService} from './services/history.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'invitation', schema: invitationSchema,collection:'invitations' },{ name: 'history', schema: historySchema,collection:'histories' }])],
 controllers: [InvitationController],
 providers: [InvitationService,HistoryService]
})
export class InvitationModule {}