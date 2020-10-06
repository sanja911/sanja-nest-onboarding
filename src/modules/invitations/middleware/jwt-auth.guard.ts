import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import {invitation,organizations,users} from '../models/invitation.interface'
import {OrganizationService} from '../services/organization.service'
import {UsersService} from '../services/user.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
