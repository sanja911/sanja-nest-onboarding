import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import {invitation,organizations,users} from '../models/invitation.interface'
import {OrganizationService} from '../services/organization.service'
import {UsersService} from '../services/user.service'
import {GqlExecutionContext,Args} from '@nestjs/graphql'
import {CurrentUser} from './user.decorator'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
export class GqlAuthGuard extends AuthGuard('jwt'){}
}