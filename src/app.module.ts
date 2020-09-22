import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { InvitationModule } from './modules/invitations/invitation.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    InvitationModule,
    GraphQLModule.forRoot({
      typePaths:['./**/*/*.graphql'],
      debug: true,
      playground: true,
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/EO")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
