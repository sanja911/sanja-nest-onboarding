import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './config';
import { UsersService } from '../../Users/Services/user.service';
import { OrganizationService } from '../../Organizations/Services/organization.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvitationService } from '../services/invitation.service';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly orgService: OrganizationService,
    private readonly invitationService: InvitationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctxs = GqlExecutionContext.create(context);
    const ctx = ctxs.getArgs();
    if (!ctx.id) {
      return await this.validateRequest(
        ctxs.getContext(),
        ctx.input.organizationId,
      );
      // return true;
    }
    return await this.getDataById(ctx.id);
    // return true;
  }

  async validateRequest(ctx, ctxs) {
    const authHeaders = ctx.req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      let decoded: any;
      try {
        decoded = jwt.verify(token, jwtConstants.secret);
        if (decoded.exp < Date.now() / 1000) {
          return false;
        }
      } catch (e) {
        return false;
      }
      const user = await this.userService.findById(decoded.id);
      if (!user) return false;
      const organization = await this.orgService.findRole(user, ctxs);
      // console.log(ctxs);
      // console.log(organization);
      // console.log(user);
      if (
        !organization ||
        (organization !== 'Manager' && organization !== 'Owner')
      ) {
        return false;
      }
      ctx.user = user;
      return true;
    } else {
      return false;
    }
  }
  async getDataById(id: string) {
    const findData = await this.invitationService.findId(id);
    if (!findData) return false;
    return true;
  }
}
