import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation} from '../models/invitation.interface'
import {history} from '../models/invitation.interface'
@Injectable()
export class InvitationService{
  constructor(@InjectModel('invitation') 
    private readonly InvitationModel: Model<invitation>){}

  async createInvitation(Invitation:invitation,History:history){
    const createdInv = new this.InvitationModel(Invitation);
    return await createdInv.save();
  }
  async getAll():Promise<invitation[]>{
      return await this.InvitationModel.find({});
  }
  async findById(id):Promise<invitation[]>{
    return await this.InvitationModel.find({_id :id});
  }
   async updateInv(id,Invitation:invitation):Promise<invitation[]>{
     const editedInv = await this.InvitationModel.findByIdAndUpdate(id, Invitation, { new: true });
    return editedInv;
  }
}