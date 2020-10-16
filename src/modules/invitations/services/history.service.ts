import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { history } from '../Interfaces/history.interface';
@Injectable()
export class HistoryService {
  constructor(
    @Inject('history')
    private readonly HistoryModel: Model<history>,
  ) {}
  async createHistory(id: string, Action) {
    const create = await this.HistoryModel({
      invitationId: id,
      action: Action,
    });
    return await create.save();
  }
}
