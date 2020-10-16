import { userSchema } from '../Schema/user.schema';
import { Connection } from 'mongoose';
export const userProviders = [
  {
    provide: 'users',
    useFactory: (connection: Connection) =>
      connection.model('users', userSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
