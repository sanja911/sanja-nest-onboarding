import { InputType, Field, Int, ID } from '@nestjs/graphql'
@InputType()
export class HistoryInput {
	@Field()
	readonly invitationId?:string;
	@Field()
	readonly action?:string;
	
}