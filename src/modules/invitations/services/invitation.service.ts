import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {invitation,users,organizations} from '../models/invitation.interface'
import {history} from '../models/history.interface'
//import {User} from '../models/user.interface'

@Injectable()
export class InvitationService{
  constructor(@InjectModel('invitation') 
    private InvitationModel: Model<invitation>){}

  async createInvitation(Invitation:invitation|Array<invitation>){
    const create = await this.InvitationModel(Invitation);
    //const view = await this.InvitationModel.find({_id:create._id}).populate('histories').exec()
    
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
  await this.InvitationModel.findById(id).update({$set:{deleted:true,status:new String("DELETED")}})
  return await this.InvitationModel.findById(id);
  }
}
/*
@Injectable()
export class userService {
  constructor(@InjectModel('users')
  private readonly userModel: Model<users>) {}
 async findUser(userId){
    return await this.userModel.findById(userId)
  } 
 async pullUser(userId,id){
   return await this.userModel.findById(userId).updateOne({$pull:{invitationsId:id}})
   
  } 
 async pushUser(userId,id){
   return await this.userModel.findById(userId).updateOne({$addToSet:{invitationsId:id}})
   
  }  
}
@Injectable()
export class OrgService {
  constructor(@InjectModel('organizations')
  private readonly OrgModel: Model<organizations>) {}
 async findOrg(orgId){
    return await this.OrgModel.findById(orgId)
  }

  async pullOrg(orgId,id){
   return await this.OrgModel.findById({_id:orgId}).updateOne({$pull:{invitationId:id}})
   
  }
  async pushOrg(orgId,id){
   return await this.OrgModel.findById(orgId).updateOne({$addToSet:{invitationId:id}})
   
  } 
}*/


