import {Controller,Get,Post,Body,Put, Delete,Param,UseGuards} from '@nestjs/common';
import {InvitationService} from '../services/invitation.service';
import {HistoryService} from '../services/history.service';
import {invitation} from '../models/invitation.interface';
import {history} from '../models/history.interface';
import {AuthGuard} from '@nestjs/passport';
import {JwtTokenMiddleware} from '../middleware/auth.middleware';
import {JwtAuthGuard} from '../middleware/jwt-auth.guard';
import {AuthGuards} from '../middleware/role.guard';
import {JwtStrategy} from '../middleware/jwt.strategy'
@Controller('invitation')
export class InvitationController{
  
  constructor(
    private readonly historyService:HistoryService,
    private readonly jwtStrategy:JwtStrategy,
    private readonly invitationService:InvitationService){}
  @UseGuards(AuthGuard('jwt'),AuthGuards)
  @Post()
   async create(@Body() inv:invitation,hist:history,payload:any){
    return await this.invitationService.createInv(inv);
   }
   @UseGuards(AuthGuard('jwt'))
  @Get()
   async GetAll(){
    return await this.invitationService.getAll();
   }
   @UseGuards(AuthGuard('jwt'))
   @Get('/:id')
   async Find(@Param('id') id){
   	return await this.invitationService.findId(id);
   }
   @UseGuards(AuthGuard('jwt'))
   @Put('/:id')
   async Update(
   	@Param('id') id,
   	@Body() Invitation:invitation,hist:history){
    return await this.invitationService.updateInv(id,Invitation)
   }
   @UseGuards(AuthGuard('jwt'))
   @Put('status/:id')
   async UpdateStatus(
     @Param('id') id,
     @Body() Invitation:invitation,hist:history){
    return await this.invitationService.updateStatus(id,Invitation)
   
   }
   @UseGuards(AuthGuard('jwt'),AuthGuards)
   @Delete('/:id')
   async Delete(
     @Param('id') id){
     return await this.invitationService.deleteInv(id)
  
   }
}