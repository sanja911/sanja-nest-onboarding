import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { InvitationService } from '../services/invitation.service';
import { invitation } from '../Interfaces/invitation.interface';
import { HistoryService } from '../services/history.service';
import { RoleGraphqlGuard } from '../middleware/role-graphql.guard';
import { InvitationType } from '../../../graphql';

@Resolver('InvitationType')
export class InvitationResolver {
  private pubSub: PubSub;
  constructor(
    private readonly invitationService: InvitationService,
    private readonly historyService: HistoryService,
  ) {
    this.pubSub = new PubSub();
  }

  @Query()
  async invitation() {
    return this.invitationService.getAll();
  }
  @Query()
  async findInv(@Args('id') id: string) {
    return this.invitationService.findId(id);
  }
  @Mutation('create')
  @UseGuards(RoleGraphqlGuard)
  async create(@Args('input') input: invitation): Promise<InvitationType> {
    const invited = await this.invitationService.createInv(input);
    this.pubSub.publish('userInvited', { userInvited: invited });
    return invited;
  }

  @Mutation('update')
  @UseGuards(RoleGraphqlGuard)
  async update(@Args('id') id: string, @Args('input') input: invitation) {
    await this.invitationService.updateInv(id, input);
    return await this.invitationService.findId(id);
  }

  @Mutation('updateStat')
  @UseGuards(RoleGraphqlGuard)
  async updateStat(@Args('id') id: string, @Args('input') input: invitation) {
    await this.invitationService.updateStatus(id, input);
    return await this.invitationService.findId(id);
  }

  @Mutation('delete')
  @UseGuards(RoleGraphqlGuard)
  async delete(@Args('id') id: string) {
    await this.invitationService.deleteInv(id);
    return await this.invitationService.findId(id);
  }

  @Subscription('userInvited', {
    filter(this: InvitationResolver, payload, variables) {
      return payload.userInvited.userId == variables.userId;
    },
  })
  userInvited() {
    return this.pubSub.asyncIterator('userInvited');
  }
}
