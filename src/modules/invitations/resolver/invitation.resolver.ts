import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvitationService } from '../services/invitation.service';
import { HistoryService } from '../services/history.service';
import { InvitationType } from '../dto/invitation.dto';
import { InvitationInput } from '../input/invitation.input';
import {invitation} from '../models/invitation.interface'
@Resolver()
export class InvitationResolver {
  constructor(private readonly invitationService:  InvitationService,
    private readonly historyService: HistoryService) {}

  @Query(() => [InvitationType])
  async invitation(){
    return this.invitationService.getAll();
  }
  @Query(()=>[InvitationType])
  async findInv(@Args('id') id:string){
    return this.invitationService.findById(id)
  }
  @Mutation(() => InvitationType)
  async create(@Args('input') input: invitation){
    const invitation = await this.invitationService.createInv(input)
    const id = invitation._id
    const Action = invitation.status
    const history = await this.historyService.createHistory(id,Action);
    await invitation.histories.push(history._id)
    //await history.save()
    await invitation.save()
    return await this.invitationService.findById(id)
  }
  
  @Mutation(() => InvitationType)
  async update(@Args('id') id: string,@Args('input') input: invitation){
  const invitation =  await this.invitationService.findById(id);
  const invupdate = await this.invitationService.updateInv(id,input)
  const Action = invupdate.status
  const history = await this.historyService.createHistory(id,Action);
  await invitation.histories.push(history._id)
  await invitation.save()
  return await this.invitationService.findById(id)
  }
  
  @Mutation(() => InvitationType)
  async updateStat(@Args('id') id: string,@Args('status') status: string){
  const invitation =  await this.invitationService.findById(id);
  const updatestat = await this.invitationService.findById(id)
  const Action = updatestat.status
  const history = await this.historyService.createHistory(id,Action);
  await invitation.histories.push(history._id)
  await invitation.save()
  await this.invitationService.updateStatus(id,status)
  return await this.invitationService.findById(id)
  }

  @Mutation(() => InvitationType)
  async delete(@Args('id') id: string){
  const invitation =  await this.invitationService.findById(id);
  const del = await this.invitationService.deleteInv(id);
  const Action = del.status
  const history = await this.historyService.createHistory(id,Action);
  await invitation.histories.push(history._id)
  await invitation.save()
  return await this.invitationService.findById(id)
  }
}
