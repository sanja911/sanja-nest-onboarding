import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InvitationService } from '../services/invitation.service';
import { HistoryService } from '../services/history.service';
import { invitation } from '../Interfaces/invitation.interface';
import { history } from '../Interfaces/history.interface';
import { AuthGuard } from '@nestjs/passport';
// import {JwtAuthGuard} from '../middleware/jwt-auth.guard';
import { AuthGuards } from '../middleware/AuthenticationGuard.guard';
import { JwtStrategy } from '../middleware/jwt.strategy';
@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly invitationService: InvitationService,
  ) {}
  @UseGuards(AuthGuard('jwt'), AuthGuards)
  @Post()
  async create(@Body() inv: invitation) {
    return await this.invitationService.createInv(inv);
  }
  @UseGuards(AuthGuard('jwt'), AuthGuards)
  @Get()
  async GetAll() {
    return await this.invitationService.getAll();
  }
  @UseGuards(AuthGuard('jwt'), AuthGuards)
  @Get('/:id')
  async Find(@Param('id') id) {
    return await this.invitationService.findId(id);
  }
  @UseGuards(AuthGuard('jwt'), AuthGuards)
  @Put('/:id')
  async Update(@Param('id') id, @Body() Invitation: invitation, hist: history) {
    return await this.invitationService.updateInv(id, Invitation);
  }
  @UseGuards(AuthGuard('jwt'), AuthGuards)
  @Put('status/:id')
  async UpdateStatus(
    @Param('id') id,
    @Body() Invitation: invitation,
    hist: history,
  ) {
    return await this.invitationService.updateStatus(id, Invitation);
  }
  @UseGuards(AuthGuard('jwt'), AuthGuards)
  @Delete('/:id')
  async Delete(@Param('id') id) {
    return await this.invitationService.deleteInv(id);
  }
}
