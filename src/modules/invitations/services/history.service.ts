import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {history} from '../models/history.interface';
import {HistoryType} from '../dto/history.dto'
import {HistoryInput} from '../input/history.input'
@Injectable()
export class HistoryService{
  constructor(@InjectModel('history') 
    private readonly HistoryModel: Model<history>){}
  async createHistory(id:string,Action){
    const create = await this.HistoryModel({invitationId:id,action:Action});
   return await create.save()
   
  }
 
}

