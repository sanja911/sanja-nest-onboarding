import {createParamDecorator,ExecutionContext,Injectable} from '@nestjs/common'
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {GqlExecutionContext} from '@nestjs/graphql'
import {JwtStrategy} from './jwt.strategy'
import {GqlAuthGuard} from './jwt-auth.guard';
import {OrganizationService} from '../services/organization.service'
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  
  const ctx = GqlExecutionContext.create(context)
  const ctxs = GqlExecutionContext.create(context).getArgs();
  const organizationId = ctxs.input.organizationId
  const findOrg = this.organizations.findOne({_id:organizationId})
  console.log(ctxs.input.organizationId)
  console.log(findOrg)
  console.log( ctx.getContext().req.user.id)
return true;
})
	
