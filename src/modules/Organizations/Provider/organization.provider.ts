import { OrganizationSchema } from '../Schema/organization.schema';
import { Connection } from 'mongoose';
export const organizationProviders = [
  {
    provide: 'organizations',
    useFactory: (connection: Connection) =>
      connection.model('organizations', OrganizationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
