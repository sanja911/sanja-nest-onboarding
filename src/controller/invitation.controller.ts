import {Controller,Get,Post,Body,Put, Delete,Param} from '@nestjs/common';
import {InvitationService} from '../services/invitation.service';
import {invitation} from '../models/invitation.interface';
import {history} from '../models/invitation.interface'
@Controller('invitation')
export class InvitationController{
  constructor(private readonly invitationService:InvitationService){}
  @Post()
   async createInv(@Body() cat:invitation):Promise<invitation[]>{
    return await this.invitationService.createInvitation(cat);
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
   	@Body() Invitation:invitation){
   	return await this.invitationService.updateInv(id,Invitation)
   }
}