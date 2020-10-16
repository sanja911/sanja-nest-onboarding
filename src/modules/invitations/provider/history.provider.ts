import { historySchema } from '../schema/invitation.schema';
import { Connection } from 'mongoose';
export const historyProviders = [
  {
    provide: 'history',
    useFactory: (connection: Connection) =>
      connection.model('histories', historySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
