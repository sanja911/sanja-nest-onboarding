import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,Status} from '../models/invitation.interface'
import {history} from '../models/history.interface'
import {InvitationType} from '../dto/invitation.dto'
import {InvitationInput} from '../input/invitation.input'


@Injectable()
export class InvitationService{
  constructor(@InjectModel('invitation') 
    private InvitationModel: Model<invitation>){}

  async createInv(createInvDTO:invitation){
      const create = await this.InvitationModel(createInvDTO);
      return await create.save()
  }
  
  async getAll():Promise<invitation[]>{
    return await this.InvitationModel.find({}).populate('histories').exec();
  }
  
  async findById(id:string){
    return await this.InvitationModel.findById(id).populate('histories').exec();
  }
  async updateInv(id:string,InvitationDTO:invitation){
    return await this.InvitationModel.findByIdAndUpdate(id, InvitationDTO, { new: true });
 }
 async updateStatus(id:string,Status:string){
   return await this.InvitationModel.findById(id).updateOne({$set:{status:(Status)}})
  }
  async deleteInv(id:string){
  await this.InvitationModel.findById(id).update({$set:{deleted:true,status:Status.DELETED,deletedDate:Date.now()}})
  return await this.InvitationModel.findById(id);
  }
}
