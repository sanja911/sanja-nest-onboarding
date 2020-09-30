import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvitationService } from '../services/invitation.service';
import {invitation} from '../models/invitation.interface'
import { HistoryService } from '../services/history.service';
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
    return this.invitationService.findId(id)
  }
  @Mutation(() => InvitationType)
  async create(@Args('input') input: invitation){
   return await this.invitationService.createInv(input) 
  }
  
  @Mutation(() => InvitationType)
  async update(@Args('id') id: string,@Args('input') input: invitation){
  await this.invitationService.updateInv(id,input)
  return await this.invitationService.findId(id)
  }
  
  @Mutation(() => InvitationType)
  async updateStat(@Args('id') id: string,@Args('input') input: invitation){
  await this.invitationService.updateStatus(id,input) 
  return await this.invitationService.findId(id)
  }

  @Mutation(() => InvitationType)
  async delete(@Args('id') id: string){
  await this.invitationService.deleteInv(id)
  return await this.invitationService.findId(id)
  }
}
