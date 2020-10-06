import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { InvitationModule } from './modules/invitations/invitation.module';
import { MongooseModule } from '@nestjs/mongoose';
// import {JwtTokenMiddleware} from './modules/invitations/middleware/auth.middleware'

@Module({
  imports: [
    InvitationModule,
    GraphQLModule.forRoot({
      typePaths:['./**/*/*.graphql'],
      debug: false,
      playground: true,
      introspection:true
    }),

    MongooseModule.forRoot("mongodb://localhost:27017/EO")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
