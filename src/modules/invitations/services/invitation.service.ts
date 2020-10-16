import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { invitation, Status } from '../Interfaces/invitation.interface';
import { HistoryService } from '../services/history.service';
import { UsersService } from '../../Users/Services/user.service';
@Injectable()
export class InvitationService {
  constructor(
    @Inject('invitation')
    private InvitationModel: Model<invitation>,
    private readonly historyService: HistoryService,
    private readonly UserService: UsersService,
  ) {}
  async createInv(createInvDTO: invitation) {
    const create = await this.InvitationModel(createInvDTO);
    const id = create._id;
    const Action = create.status;
    const history = await this.historyService.createHistory(id, Action);
    await create.histories.push(history._id);
    await create.save();
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
    const invitationEntry = await this.InvitationModel.findByIdAndUpdate(
      id,
      Invitation,
      { new: true },
    );
    const Action = invitationEntry.status;
    const history = await this.historyService.createHistory(id, Action);
    await invitationEntry.histories.push(history._id);
    await invitationEntry.save();
    return await this.InvitationModel.find({ _id: id })
      .populate('histories')
      .exec();
  }

  async deleteInv(id: string) {
    const invitations = await this.InvitationModel.findById(id);
    await this.InvitationModel.findById(id).update({
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
