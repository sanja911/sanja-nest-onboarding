import { Module } from '@nestjs/common';
import { OrganizationSchema } from './Schema/organization.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationService } from './Services/organization.service';
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
  exports: [OrganizationService],
})
export class OrganizationModule {}
