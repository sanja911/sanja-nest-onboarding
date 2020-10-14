import { Module } from '@nestjs/common';
import { InvitationResolver } from './resolver/invitation.resolver';
import { InvitationController } from './controller/invitation.controller';
import { invitationSchema, historySchema } from './schema/invitation.schema';
import { OrganizationSchema } from '../Organizations/Schema/organization.schema';
import { userSchema } from '../Users/Schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './services/invitation.service';
// import { OrganizationService } from '../Organizations/Services/organization.service';
// import { UsersService } from '../Users/Services/user.service';
import { UserModule } from '../Users/user.module';
import { OrganizationModule } from '../Organizations/organizations.module';
import { HistoryService } from './services/history.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './middleware/config';
import { JwtStrategy } from './middleware/jwt.strategy';
import { AuthGuards } from './middleware/AuthenticationGuard.guard';
import { AuthenticationGuard } from './middleware/role-graphql.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    OrganizationModule,
    MongooseModule.forFeature([
      {
        name: 'invitation',
        schema: invitationSchema,
        collection: 'invitations',
      },
      { name: 'history', schema: historySchema, collection: 'histories' },
      { name: 'users', schema: userSchema, collection: 'users' },
      {
        name: 'organizations',
        schema: OrganizationSchema,
        collection: 'organizations',
      },
    ]),
  ],
  controllers: [InvitationController],
  providers: [
    ConfigService,
    AuthenticationGuard,
    AuthGuards,
    JwtStrategy,
    InvitationResolver,
    InvitationService,
    HistoryService,
  ],
})
export class InvitationModule {}
