import {Controller,Get,Post,Body,Put, Delete,Param} from '@nestjs/common';
import {InvitationService} from '../services/invitation.service';
import {HistoryService} from '../services/history.service';
import {invitation,users,organizations} from '../models/invitation.interface';
import {history} from '../models/history.interface';
//import {User} from '../models/user.interface';
@Controller('invitation')
export class InvitationController{
  constructor(
    private readonly historyService:HistoryService,
    private readonly invitationService:InvitationService
   /* private readonly UserService:userService,
    private readonly orgService:OrgService*/){}
  @Post()

   async create(@Body() inv:invitation,hist:history){
    const invitation = await this.invitationService.createInvitation(inv);
    const invId = invitation._id
    const history = await this.historyService.createHistory(invId);
    //const userId = invitation.userId
    const organizationId = invitation.organizationId
    //const users =await this.UserService.findUser(userId)
    //const organization = await this.orgService.findOrg(organizationId);
    //await users.organizationsId.push(organization._id)
    //await organization.invitationId.push(invitation._id)
    //await users.invitationsId.push(invitation._id)
    await invitation.histories.push(history._id)
    //await history.invitationId.push(invId)
    //console.log(organization._id)
    //await organization.save()
    //await users.save()
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
    const invitationId = await this.invitationService.findById(id);
    //const userId = invitationId.userId
   // const orgId = invitationId.organizationId
    const history = await this.historyService.updateHistory(id)
    await invitationId.histories.push(history._id)
    //await this.UserService.pushUser(userId,id)
    //await this.orgService.pushOrg(orgId,id)
    await history.save()
    await invitationId.save()
    return await this.invitationService.updateInv(id,Invitation)
   }
   @Delete('/:id')
   async Delete(
     @Param('id') id,
     @Body() Invitation:invitation,hist:history){
    const invitations = await this.invitationService.findById(id);
    //const invId = invitations._id
    const history = await this.historyService.deleteHistory(id)
   // const orgId = invitations.organizationId
   // const userId = invitations.userId
    //const organizationId = await this.orgService.findOrg(orgId);
   // await this.orgService.pullOrg(orgId,id);
  //  await this.UserService.pullUser(userId,id);
  //  await invitations.histories.push(history._id)
    
    //await pullOrg.save()
    //await pullUser.save()
    await invitations.histories.push(history._id)
    await invitations.save()
    await history.save()
    return await this.invitationService.deleteInv(id,Invitation)
     
   }
}