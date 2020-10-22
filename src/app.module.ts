import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { InvitationModule } from './modules/invitations/invitation.module';
import { OrganizationModule } from './modules/Organizations/organizations.module';
import { UserModule } from './modules/Users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
// import {JwtTokenMiddleware} from './modules/invitations/middleware/auth.middleware'
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    InvitationModule,
    OrganizationModule,
    UserModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*/*.graphql'],
      debug: false,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/EO'),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
