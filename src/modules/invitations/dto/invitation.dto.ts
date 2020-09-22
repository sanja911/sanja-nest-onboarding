import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { HistoryType } from './history.dto'
@ObjectType()
export class InvitationType {
	@Field(()=>ID)
	readonly id?:string;
	@Field()
	readonly userId?:string;
	@Field()
	readonly organizationId?:string;
	@Field()
	readonly notes?:string;
	@Field()
	readonly status?:string;
	@Field(()=>[HistoryType],{nullable: true})
	readonly histories:HistoryType[];
	@Field()
	readonly deleted?:boolean;
}