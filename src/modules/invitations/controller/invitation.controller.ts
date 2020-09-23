import {Controller,Get,Post,Body,Put, Delete,Param} from '@nestjs/common';
import {InvitationService} from '../services/invitation.service';
import {HistoryService} from '../services/history.service';
import {invitation} from '../models/invitation.interface';
import {history} from '../models/history.interface';
@Controller('invitation')
export class InvitationController{
  constructor(
    private readonly historyService:HistoryService,
    private readonly invitationService:InvitationService){}
  @Post()

   async create(@Body() inv:invitation,hist:history){
    const invitation = await this.invitationService.createInv(inv);
    const invId = invitation._id
    const Action = invitation.status
    const history = await this.historyService.createHistory(invId,Action);
    await invitation.histories.push(history._id)
    await invitation.save()
    return await this.invitationService.findById(invId);
   }
  @Get()
   async GetAll(){
    return await this.invitationService.getAll();
   }
   @Get('/:id')
   async Find(@Param('id') id){
   	return await this.invitationService.findById(id);
   }
   @Put('/:id')
   async Update(
   	@Param('id') id,
   	@Body() Invitation:invitation,hist:history){
    const invitationId = await this.invitationService.findById(id);
    const updt = await this.invitationService.updateInv(id,Invitation)
    const Action = updt.status
    const history = await this.historyService.createHistory(id,Action);
    await invitationId.histories.push(history._id)
    await invitationId.save()
    return await this.invitationService.findById(id);
   }
   @Delete('/:id')
   async Delete(
     @Param('id') id,
     @Body() Invitation:invitation,hist:history){
    const invitations = await this.invitationService.findById(id);
    const del  = await this.invitationService.deleteInv(id,Invitation)
    const Action = del.status
    const history = await this.historyService.createHistory(id,Action);
    await invitations.histories.push(history._id)
    await invitations.save()
    return await this.invitationService.findById(id);
   }
}