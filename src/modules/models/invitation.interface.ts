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
	EDITED = 'EDITED',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED'
}
export interface users extends Document{
	 name:String,
     username:String,
     email:String,
     password:String,
     projectsId:String[],
     organizationsId:String[],
     invitationsId:String[]
}

export interface organizations extends Document{
	 name:String,
     users:String[],
     project:String[],
     invitationId:String[]
}


