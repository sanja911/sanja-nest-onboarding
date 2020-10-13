import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { invitation, Status } from '../models/invitation.interface';
import { history } from '../models/history.interface';
import { HistoryService } from '../services/history.service';
import { UsersService } from '../services/user.service';
import { OrganizationService } from '../services/organization.service';
@Injectable()
export class InvitationService {
  constructor(
    @InjectModel('invitation')
    private InvitationModel: Model<invitation>,
    private readonly historyService: HistoryService,
    private readonly UserService: UsersService,
    private readonly orgService: OrganizationService,
  ) {}
  async createInv(createInvDTO: invitation) {
    const create = await this.InvitationModel(createInvDTO);
    const id = create._id;
    const usersId = create.userId;
    const Action = create.status;
    const user = await this.UserService.findById(usersId);
    const organization = await this.orgService.findOrg(create.organizationId);
    const history = await this.historyService.createHistory(id, Action);
    await user.invId.push(id);
    await create.histories.push(history._id);
    await user.orgId.push(create.organizationId);
    await organization.users.push({ role: 'Member', userId: usersId });
    await organization.invitationId.push(create._id);
    await create.save();
    await user.save();
    await organization.save();
    return await this.InvitationModel.findById(id)
      .populate('histories')
      .exec();
  }

  async getAll(): Promise<invitation[]> {
    return await this.InvitationModel.find({})
      .populate('histories')
      .exec();
  }

  async findId(id: string) {
    return await this.InvitationModel.findById(id)
      .populate('histories')
      .exec();
  }
  async updateInv(id: string, InvitationDTO: invitation) {
    const updateInvitation = await this.InvitationModel.findByIdAndUpdate(
      id,
      InvitationDTO,
      { new: true },
    );
    const Action = Status.UPDATED;
    const history = await this.historyService.createHistory(id, Action);
    await updateInvitation.histories.push(history._id);
    await updateInvitation.save();
    return await this.InvitationModel.find({ _id: id })
      .populate('histories')
      .exec();
  }
  async updateStatus(id: string, Invitation: invitation) {
    const invitation = await this.InvitationModel.findByIdAndUpdate(
      id,
      Invitation,
      { new: true },
    );
    const Action = invitation.status;
    const history = await this.historyService.createHistory(id, Action);
    await invitation.histories.push(history._id);
    await invitation.save();
    return await this.InvitationModel.find({ _id: id })
      .populate('histories')
      .exec();
  }

  async deleteInv(id: string) {
    const invitations = await this.InvitationModel.findById(id);
    const del = await this.InvitationModel.findById(id).update({
      $set: { deleted: true, status: Status.DELETED, deletedDate: Date.now() },
    });
    const Action = Status.DELETED;
    const history = await this.historyService.createHistory(id, Action);
    await invitations.histories.push(history._id);
    await invitations.save();
    return await this.InvitationModel.find({ _id: id })
      .populate('histories')
      .exec();
  }
}
