import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {history} from '../models/history.interface';
import {invitation} from '../models/invitation.interface';

@Injectable()
export class HistoryService{
  constructor(@InjectModel('history') 
    private readonly HistoryModel: Model<history>,){}
  async createHistory(id){
    const create = await this.HistoryModel({invitationId:id,action:new String("Created")});
   return await create.save()
   
  }
  async updateHistory(id){
    const create = await this.HistoryModel({invitationId:id,action:new String("Updated")});
   return await create.save()
   
  }
  async deleteHistory(id){
    const create = await this.HistoryModel({invitationId:id,action:new String("Deleted")});
   return await create.save()
   
  }
  async getAll():Promise<history[]>{
      return await this.HistoryModel.find({});
  }
 
}

