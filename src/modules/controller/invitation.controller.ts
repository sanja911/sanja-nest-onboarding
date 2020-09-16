import {Controller,Get,Post,Body,Put, Delete,Param} from '@nestjs/common';
import {InvitationService,userService,OrgService} from '../services/invitation.service';
import {HistoryService} from '../services/history.service';
import {invitation,users} from '../models/invitation.interface';
import {history} from '../models/history.interface';
//import {User} from '../models/user.interface';
@Controller('invitation')
export class InvitationController{
  constructor(
    private readonly historyService:HistoryService,
    private readonly invitationService:InvitationService,
    private readonly UserService:userService,
    private readonly orgService:OrgService){}
  @Post()

   async create(@Body() inv:invitation,hist:history){
    const invitation = await this.invitationService.createInvitation(inv);
    const invId = invitation._id
    const history = await this.historyService.createHistory(invId);
    const userId = invitation.userId
    const organizationId = invitation.organizationId
    const users =await this.UserService.findUser(userId)
    const organization = await this.orgService.findOrg(organizationId);
    await users.organizationsId.push(organization._id)
    await organization.invitationId.push(invitation._id)
    await users.invitationsId.push(invitation._id)
    await invitation.histories.push(history._id)
    //await history.invitationId.push(invId)
    //console.log(organization._id)
    await organization.save()
    await users.save()
    await history.save()
    return invitation.save()
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
    const history = await this.historyService.updateHistory(hist,Invitation)
    await history.invitationId.push(id)
    await history.save()
    return await this.invitationService.updateInv(id,Invitation)
   }
   @Delete('/:id')
   async Delete(
     @Param('id') id,
     @Body() Invitation:invitation,hist:history){
    const history = await this.historyService.deleteHistory(hist,Invitation)
    await history.invitationId.push(id)
    await history.save()
    return await this.invitationService.deleteInv(id,Invitation)
   }
}