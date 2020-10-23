/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Status {
  NEW = 'NEW',
  UPDATED = 'UPDATED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}

export class InvitationInput {
  userId?: string;
  organizationId?: string;
  projectId?: string;
  notes?: string;
  status?: Status;
  histories?: string;
  deleted?: boolean;
}

export class HistoryType {
  id?: string;
  invitationId?: string;
  action?: string;
  created?: string;
}

export class InvitationType {
  id: string;
  userId: string;
  organizationId: string;
  projectId: string;
  notes?: string;
  status?: string;
  histories?: HistoryType[];
  deleted?: boolean;
  deletedDate?: string;
}

export abstract class IQuery {
  abstract invitation(): InvitationType[] | Promise<InvitationType[]>;

  abstract findInv(id?: string): InvitationType | Promise<InvitationType>;
}

export abstract class IMutation {
  abstract create(
    input?: InvitationInput,
  ): InvitationType | Promise<InvitationType>;

  abstract update(
    input: InvitationInput,
    id: string,
  ): InvitationType | Promise<InvitationType>;

  abstract updateStat(
    input: InvitationInput,
    id: string,
  ): InvitationType | Promise<InvitationType>;

  abstract delete(id: string): InvitationType | Promise<InvitationType>;
}

export abstract class ISubscription {
  abstract userInvited(
    userId: string,
  ): InvitationType | Promise<InvitationType>;
}
