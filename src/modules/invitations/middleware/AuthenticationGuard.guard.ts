import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { organizations } from '../../Organizations/Interfaces/organization.interface';
import { InvitationService } from '../services/invitation.service';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    @InjectModel('organizations')
    private OrganizationsModel: Model<organizations>,
    private readonly invitationService: InvitationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const usersId = request.user.id;
    const orgId = request.body.organizationId;
    const org = await this.OrganizationsModel.findOne(
      { _id: orgId },
      { users: { $elemMatch: { userId: usersId } } },
    ).exec();
    if (!request.params.id) {
      const getRole = org.get('users.role').toString();
      if (getRole === 'Member' || !getRole || !org) {
        return false;
      }
      return true;
    } else {
      const id = request.params.id;
      this.getData(id, context);
      return true;
    }
  }
  async getData(id: string, context: ExecutionContext) {
    const findData = await this.invitationService.findId(id);
    const request = context.switchToHttp().getRequest();
    const result = context.switchToHttp().getResponse();
    if (!findData) {
      result.status(404).json({ message: 'Data not found' });
    }
    const usersId = request.user.id;
    const org = await this.OrganizationsModel.findOne(
      { _id: findData.organizationId },
      { users: { $elemMatch: { userId: usersId } } },
    ).exec();
    const getRole = org.get('users.role').toString();
    if (getRole == 'Member') {
      result.status(404).json({ message: 'Data not found' });
    }
    return true;
  }
}
