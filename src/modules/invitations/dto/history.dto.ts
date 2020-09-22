import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
@ObjectType()
export class HistoryType {
	@Field(()=>ID)
	readonly id?:string;
	@Field()
	readonly invitationId?:string;
	@Field()
	readonly action?:string;
}