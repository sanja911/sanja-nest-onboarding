import { ExtractJwt, Strategy } from 'passport-jwt';
import {Model} from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './config';
import {InjectModel} from '@nestjs/mongoose';
import {users} from '../models/invitation.interface'
import {OrganizationService} from '../services/organization.service'
import {UsersService} from '../services/user.service'
import {InvitationService} from '../services/invitation.service'
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

  async validate(payload: any) {
   
    return { id:payload.id }; 
  }
}
