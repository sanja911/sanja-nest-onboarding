import * as mongoose from 'mongoose';
import { Status } from '../Interfaces/invitation.interface';
export const invitationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    notes: { type: String },
    status: {
      type: String,
      enum: Object.keys(Status).map(key => Status[key]),
      default: Status.NEW,
    },
    histories: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Histories' }],
    created: { type: Date, default: Date.now },
    updated: { type: Date },
    deleted: { type: Boolean, default: false },
    deletedDate: { type: Date },
  },
  {
    versionKey: false,
    //timestamps:true
  },
);
const Invitation = mongoose.model('Invitation', invitationSchema);

export const historySchema = new mongoose.Schema(
  {
    invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' },
    created: { type: Date, default: Date.now },
    action: {
      type: String,
      enum: Object.keys(Status).map(key => Status[key]),
      default: Status.NEW,
    },
  },
  {
    versionKey: false,
  },
);
const Histories = mongoose.model('Histories', historySchema);

invitationSchema.pre('save', function() {
  this.updated = new Date();
});

invitationSchema.post('save', function() {
  this.created = new Date();
});
