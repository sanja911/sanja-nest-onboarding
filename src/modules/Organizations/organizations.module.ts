import { Module } from '@nestjs/common';
import { OrganizationSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationService } from './services/organization.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'organizations',
        schema: OrganizationSchema,
        collection: 'organizations',
      },
    ]),
  ],
  providers: [OrganizationService],
})
export class OrganizationModule {}
