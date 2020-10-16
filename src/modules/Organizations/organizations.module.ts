import { Module } from '@nestjs/common';
import { OrganizationService } from './Services/organization.service';
import { organizationProviders } from './Provider/organization.provider';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [OrganizationService, ...organizationProviders],
  exports: [OrganizationService, ...organizationProviders],
})
export class OrganizationModule {}
