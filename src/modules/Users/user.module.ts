import { Module } from '@nestjs/common';
import { UsersService } from './Services/user.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './provider/user.provider';
@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders],
  exports: [UsersService, ...userProviders],
})
export class UserModule {}
