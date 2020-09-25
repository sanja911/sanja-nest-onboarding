import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,Status} from '../models/invitation.interface'
import {history} from '../models/history.interface'
import {InvitationType} from '../dto/invitation.dto'
import {HistoryService } from '../services/history.service';


@Injectable()
export class InvitationService{
  constructor(@InjectModel('invitation') private InvitationModel: Model<invitation>,
    private readonly historyService:HistoryService){}
  async createInv(createInvDTO:invitation){
      const create = await this.InvitationModel(createInvDTO);
      const id = create._id
      const Action = create.status
      const history = await this.historyService.createHistory(id,Action);
      await create.histories.push(history._id)
      await create.save()
      return await this.InvitationModel.findById(id).populate('histories').exec();
  }
  
  async getAll():Promise<invitation[]>{
    return await this.InvitationModel.find({}).populate('histories').exec();
  }
  
  async findId(id:string){
    return await this.InvitationModel.findById(id).populate('histories').exec();
  }
  async updateInv(id:string,InvitationDTO:invitation){
    const updateInvitation = await this.InvitationModel.findByIdAndUpdate(id, InvitationDTO, { new: true });
    const Action = updateInvitation.status
    const history = await this.historyService.createHistory(id,Action);
    await updateInvitation.histories.push(history._id)
    await updateInvitation.save()
    return  await this.InvitationModel.find({_id:id}).populate('histories').exec();
 }
 async updateStatus(id:string,Status:string){
  const invitation =  await this.InvitationModel.findById(id);
  const updatestat = await this.InvitationModel.findById(id)
  const Action = updatestat.status
  const history = await this.historyService.createHistory(id,Action);
  await invitation.histories.push(history._id)
  await invitation.save()
  await this.InvitationModel.findById(id).updateOne({$set:{status:(Status)}})
  return  await this.InvitationModel.find({_id:id}).populate('histories').exec();
  }
  async deleteInv(id:string){
  const invitations = await this.InvitationModel.findById(id);
  const del = await this.InvitationModel.findById(id).update({$set:{deleted:true,status:Status.DELETED,deletedDate:Date.now()}})
  const Action = Status.DELETED
  const history = await this.historyService.createHistory(id,Action);
  await invitations.histories.push(history._id)
 await invitations.save()
return  await this.InvitationModel.find({_id:id}).populate('histories').exec();
  }
}
