import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './config';
import { UsersService } from '../../Users/Services/user.service';
import { OrganizationService } from '../../Organizations/Services/organization.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly orgService: OrganizationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctxs = GqlExecutionContext.create(context);
    const ctx = ctxs.getArgs();
    // console.log(ctx.input.organizationId)
    return await this.validateRequest(
      ctxs.getContext(),
      ctx.input.organizationId,
    );
  }
  async validateRequest(ctx, ctxs) {
    const authHeaders = ctx.req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      let decoded: any;
      try {
        decoded = jwt.verify(token, jwtConstants.secret);
        if (decoded.exp < Date.now() / 1000) {
          this.unAuthorized();
        }
      } catch (e) {
        this.unAuthorized();
      }
      const user = await this.userService.findById(decoded.id);
      const organization = await this.orgService.findRole(user, ctxs);
      // console.log(organization)
      // console.log(user)
      if (!organization || organization === 'Member') {
        this.unAuthorized();
      }
      ctx.user = user;
      return true;
    } else {
      this.unAuthorized();
    }
  }

  // TODO make an utility function across all app.
  private unAuthorized() {
    const errors = { id: 'You are not authorized for this organization' };
    throw new HttpException(
      { data: { message: 'Token is not valid', errors } },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
