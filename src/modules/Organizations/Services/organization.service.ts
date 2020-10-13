import {Injectable,HttpStatus} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,organizations,users} from '../models/invitation.interface'
import {HttpException} from '@nestjs/common/exceptions/http.exception';
@Injectable()
export class OrganizationService{
  constructor(@InjectModel('organizations') 
  	private OrganizationsModel: Model<organizations>){}

async findRole(usersId: string,orgId:string){
   // const OrganizationId = await this.
   const userRole =  await this.OrganizationsModel.findOne({_id:orgId},{users:{$elemMatch:{userId:usersId}}}).exec();
   return await userRole.get('users.role').toString()
  
}
async findOrg(orgId:string){
   return await this.OrganizationsModel.findOne({_id:orgId});
}

    // return this.UserModel(user);
  }
