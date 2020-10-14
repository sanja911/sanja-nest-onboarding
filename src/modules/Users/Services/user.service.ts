import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { users } from '../Interfaces/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private UsersModel: Model<users>,
  ) {}

  async findById(id: string) {
    return await this.UsersModel.findById(id).exec();
  }
  async updateOrg(organizationId: string, id: string) {
    return await this.UsersModel.findOne(id).update({
      users: { $set: { orgId: organizationId } },
    });
  }
}
