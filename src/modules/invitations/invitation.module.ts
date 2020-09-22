import { Module } from '@nestjs/common';
import { InvitationResolver } from './resolver/invitation.resolver';
import { invitationSchema,historySchema } from './schema/invitation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './services/invitation.service';
import { HistoryService } from './services/history.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'invitation', schema: invitationSchema, collection:'invitations' },{ name: 'history', schema: historySchema, collection:'histories' }])],
    providers: [InvitationResolver, InvitationService,HistoryService],
})
export class InvitationModule {}