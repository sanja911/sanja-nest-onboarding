import { Document } from 'mongoose';
export interface users extends Document {
  id: Number;
  name: String;
  username: String;
  email: String;
  password: String;
  project: String;
  orgId: String;
  invId: String;
}
