import {Document} from 'mongoose';
export interface invitation extends Document{
	userId:String,
	notes:String,
	stat:String,
	created:String,
	updated:String
}
export interface history extends Document{
	invitationId:String,
	date:String,
	action:String
}
