import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './config';
import { InjectModel } from '@nestjs/mongoose';
import { users } from '../././../Users/Interfaces/user.interface';
import { OrganizationService } from '../../Organizations/Services/organization.service';
import { UsersService } from '../../Users/Services/user.service';
import { InvitationService } from '../services/invitation.service';
// import {RoleGuard} from './role.guard'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  use;
  constructor(
    @InjectModel('users')
    private UsersModel: Model<users>,
    private readonly OrgService: OrganizationService,
    private readonly UserService: UsersService,

    private readonly invitationService: InvitationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.id };
  }
}
