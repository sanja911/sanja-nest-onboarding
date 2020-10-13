import {Controller,Get,Post,Body,Put, Delete,Param,UseGuards} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvitationService } from '../services/invitation.service';
import {invitation} from '../models/invitation.interface'
import { HistoryService } from '../services/history.service';
// import {GqlAuthGuard} from '../middleware/jwt-auth.guard';
import {AuthGuards} from '../middleware/role.guard';
import {AuthenticationGuard} from '../middleware/role-graphql.guard'
// import {AuthenticatedUser} from '../models/invitation.interface'
import { CurrentUser } from '../middleware/user.decorator';
@Resolver()
export class InvitationResolver {
  constructor(private readonly invitationService:  InvitationService,
    private readonly historyService: HistoryService) {}

  @Query()
  async invitation(){
    return this.invitationService.getAll();
  }
  @Query()
  async findInv(@Args('id') id:string){
    return this.invitationService.findId(id)
  }
  @Mutation()
  @UseGuards(AuthenticationGuard)

   async create(@Args('input') input: invitation){
   return await this.invitationService.createInv(input) 
  }
  
  @Mutation()
  @UseGuards(AuthenticationGuard)
  async update(@Args('id') id: string,@Args('input') input: invitation){
  await this.invitationService.updateInv(id,input)
  return await this.invitationService.findId(id)
  }
  
  @Mutation()
  @UseGuards(AuthenticationGuard)
  async updateStat(@Args('id') id: string,@Args('input') input: invitation){
  await this.invitationService.updateStatus(id,input) 
  return await this.invitationService.findId(id)
  }

  @Mutation()
  @UseGuards(AuthenticationGuard)
  async delete(@Args('id') id: string){
  await this.invitationService.deleteInv(id)
  return await this.invitationService.findId(id)
  }
}
