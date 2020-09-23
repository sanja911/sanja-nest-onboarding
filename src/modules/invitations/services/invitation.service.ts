import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,Status} from '../models/invitation.interface'
import {history} from '../models/history.interface'


@Injectable()
export class InvitationService{
  constructor(@InjectModel('invitation') 
    private InvitationModel: Model<invitation>){}

  async createInvitation(Invitation:invitation|Array<invitation>){
    const create = await this.InvitationModel(Invitation);  
    return await create.save()
    
  }
  
  async getAll():Promise<invitation[]>{
    return await this.InvitationModel.find({}).populate('histories').exec();
  }
  async findInv(organizationId){
    return await this.InvitationModel.findById(organizationId);
  }
  async findById(id){
    return await this.InvitationModel.findById(id).populate('histories').exec();
  }
   async updateInv(id,Invitation:invitation|Array<invitation>){
     const editedInv = await this.InvitationModel.findByIdAndUpdate(id, Invitation, { new: true });
    return await editedInv;
  }
  async deleteInv(id,Invitation:invitation|Array<invitation>){
  await this.InvitationModel.findById(id).update({$set:{deleted:true,status:Status.DELETED,deletedDate:Date.now()}})
  return await this.InvitationModel.findById(id);
  }
}


