import { InputType, Field, Int, ID } from '@nestjs/graphql'
@InputType()
export class InvitationInput {
	@Field()
	readonly userId?:string;
	@Field()
	readonly organizationId?:string;
	@Field()
	readonly notes?:string;
	@Field()
	readonly status?:string;
	@Field()
	readonly histories?:string;
	@Field()
	readonly deleted?:boolean;
}