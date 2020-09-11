import {Document} from 'mongoose';
export interface invitation extends Document{
	userId:String,
	notes:String,
	stat:String,
	created:String,
	updated:String
}
