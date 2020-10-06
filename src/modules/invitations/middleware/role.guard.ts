import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {organizations} from '../models/invitation.interface'
import {OrganizationService} from '../services/organization.service'
@Injectable()
export class AuthGuards implements CanActivate {
	constructor(@InjectModel('organizations') 
  	private OrganizationsModel: Model<organizations>){}
  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const result = context.switchToHttp().getResponse();
    const usersId = request.user.id
    const orgId = request.body.organizationId
    const user = request.body.userId
    const org = await this.OrganizationsModel.findOne({_id:orgId},{users:{$elemMatch:{userId:usersId}}}).exec();
    const getRole = org.get('users.role',).toString()

    if(getRole==='Manager'||getRole==='Owner'){
    	return org
    }else{
    	return false
    }
  }
}