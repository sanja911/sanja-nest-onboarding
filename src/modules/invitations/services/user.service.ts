
import {Injectable,HttpStatus} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,organizations,users} from '../models/invitation.interface'
import {HttpException} from '@nestjs/common/exceptions/http.exception';
@Injectable()
export class UsersService{
  constructor(@InjectModel('users') 
  	private UsersModel: Model<users>){}

async findById(id: string){
    return await this.UsersModel.findById(id).exec();
}
async updateOrg(organizationId:string,id:string){
	return await this.UsersModel.findOne(id).update({users:{$set:{orgId:organizationId}}})
}
}
