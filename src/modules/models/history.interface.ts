import {Document} from 'mongoose';
//import {invitation} from './invitation.interface'
export interface history extends Document{
	invitationId:String,
	action:String 
}

