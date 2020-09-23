import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {history} from '../models/history.interface';
import {invitation} from '../models/invitation.interface';

@Injectable()
export class HistoryService{
  constructor(@InjectModel('history') 
    private readonly HistoryModel: Model<history>){}
  async createHistory(id,Action){
    const create = await this.HistoryModel({invitationId:id,action:Action});
   return await create.save()
   
  }
 
}

