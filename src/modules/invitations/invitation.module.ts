import { Module } from '@nestjs/common';
import { InvitationResolver } from './resolver/invitation.resolver';
import { InvitationController } from './controller/invitation.controller';
import { InvitationService } from './services/invitation.service';
import { UserModule } from '../Users/user.module';
import { OrganizationModule } from '../Organizations/organizations.module';
import { HistoryService } from './services/history.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './middleware/config';
import { JwtStrategy } from './middleware/jwt.strategy';
import { historyProviders } from './provider/history.provider';
import { invitationProviders } from './provider/invitation.provider';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [InvitationController],
  providers: [
    ...historyProviders,
    ...invitationProviders,
    ConfigService,
    JwtStrategy,
    InvitationResolver,
    InvitationService,
    HistoryService,
  ],
})
export class InvitationModule {}
