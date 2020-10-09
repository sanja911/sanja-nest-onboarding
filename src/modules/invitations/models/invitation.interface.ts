import {Document} from 'mongoose';
import {history} from './history.interface'

export interface invitation extends Document{
	userId:String,
	organizationId:String,
	notes:String,
	status:Status,
	created:String,
	updated:String,
	histories:String[]

}
export enum Status{
	NEW = 'NEW',
	UPDATED = 'UPDATED',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
	DELETED = 'DELETED'
}
export interface users extends Document{
	id:Number,
	 name:String,
     username:String,
     email:String,
     password:String,
     project:String,
     orgId:String,
     invId:String
}
export interface organizations extends Document{
	 name:String,
     users:String,
     project:String,
     invitationId:String
}

export type AuthenticatedUser = Pick<users,'id'>
export type JwtPayload={
	id:number;
}
export type UserContext={
req:{
	user:AuthenticatedUser
}
}