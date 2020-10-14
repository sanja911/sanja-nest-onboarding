import { Document } from 'mongoose';
import { history } from './history.interface';

export interface invitation extends Document {
  userId: String;
  organizationId: String;
  notes: String;
  status: Status;
  created: String;
  updated: String;
  histories: String[];
}
export enum Status {
  NEW = 'NEW',
  UPDATED = 'UPDATED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
