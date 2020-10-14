import { Module } from '@nestjs/common';
import { userSchema } from './Schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './Services/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: userSchema, collection: 'users' },
    ]),
  ],
  providers: [UsersService],
})
export class UserModule {}
