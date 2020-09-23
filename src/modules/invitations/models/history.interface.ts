import {Document} from 'mongoose';
import {Status} from './invitation.interface'
export interface history extends Document{
	invitationId:String,
	action:Status 
}

