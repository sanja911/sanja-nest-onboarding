import { ExtractJwt, Strategy } from 'passport-jwt';
import {Model} from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,ExecutionContext,Req,Body} from '@nestjs/common';
import { jwtConstants } from './config';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,organizations,users} from '../models/invitation.interface'
import {OrganizationService} from '../services/organization.service'
import {UsersService} from '../services/user.service'
import {InvitationService} from '../services/invitation.service'
import { Request, Response } from 'express';
// import {RoleGuard} from './role.guard'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  use
  constructor(@InjectModel('users') 
    private UsersModel: Model<users>,
    private readonly OrgService:OrganizationService,
    private readonly UserService:UsersService,
    
    private readonly invitationService:InvitationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any,id:string) {
   
    return { id:payload.id }; 
  }
}
