import { Document } from 'mongoose';
export interface organizations extends Document {
  name: String;
  users: String;
  project: String;
  invitationId: String;
}
