import { invitationSchema } from '../schema/invitation.schema';
import { Connection } from 'mongoose';
export const invitationProviders = [
  {
    provide: 'invitation',
    useFactory: (connection: Connection) =>
      connection.model('invitations', invitationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
