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
    return await this.invitationService.createInv(inv);
   }
  @Get()
   async GetAll(){
    return await this.invitationService.getAll();
   }
   @Get('/:id')
   async Find(@Param('id') id){
   	return await this.invitationService.findId(id);
   }
   @Put('/:id')
   async Update(
   	@Param('id') id,
   	@Body() Invitation:invitation,hist:history){
    return await this.invitationService.updateInv(id,Invitation)
   }
   @Put('status/:id')
   async UpdateStatus(
     @Param('id') id,
     @Body() Invitation:invitation,hist:history){
    return await this.invitationService.updateStatus(id,Invitation)
   
   }
   @Delete('/:id')
   async Delete(
     @Param('id') id){
     return await this.invitationService.deleteInv(id)
  
   }
}