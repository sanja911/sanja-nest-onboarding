import * as mongoose from 'mongoose';
export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    project: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    orgId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        unique: true,
      },
    ],
    invId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invitation',
      },
    ],

    /*Created:{
        type:Date, default:Date.now
    },
    Updated:{
        type:Date, default:Date.now
    }*/
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const User = mongoose.model('User', userSchema);
