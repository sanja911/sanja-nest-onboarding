import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { history } from './history.interface';

export interface invitation extends Document {
  userId: String;
  organizationId: String;
  projectId: String;
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
