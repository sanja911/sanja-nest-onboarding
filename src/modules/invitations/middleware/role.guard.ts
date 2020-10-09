import { Injectable, CanActivate, ExecutionContext,HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {organizations} from '../models/invitation.interface'
import {OrganizationService} from '../services/organization.service'
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class AuthGuards implements CanActivate {
	constructor(@InjectModel('organizations') 
  	private OrganizationsModel: Model<organizations>){}
  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const result = context.switchToHttp().getResponse();
    const usersId = request.user.id
    const orgId = request.body.organizationId
    const user = request.body.userId
    const org = await this.OrganizationsModel.findOne({_id:orgId},{users:{$elemMatch:{userId:usersId}}}).exec();
    const getRole = org.get('users.role',).toString()

    if(!getRole||getRole==='Member'){
    	this.unAuthorized(context)
    }return true
  }

  private unAuthorized(context: ExecutionContext) {
    const errors = { err: 'You are not authorized for this organization' };
    throw new HttpException(
      { data: { message: 'Token is not valid or expired', errors } },
      HttpStatus.UNAUTHORIZED);
  }
}