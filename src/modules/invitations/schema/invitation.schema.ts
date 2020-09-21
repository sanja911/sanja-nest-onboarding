import * as mongoose from 'mongoose';
import {Status} from '../models/invitation.interface'
export const invitationSchema = new mongoose.Schema({
   
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    organizationId:{type:mongoose.Schema.Types.ObjectId,ref:'Organization'},  
    notes:{type:String},
    status:{type:String,enum:Object.keys(Status).map(key=>Status[key]),default:Status.NEW},
    histories:[{type:mongoose.Schema.Types.ObjectId, ref:'Histories'}],
    deleted : {type:String},
    created : {type:Date},
    updated : {type:Date}
},{
  versionKey:false,
  //timestamps:true
})
const Invitation = mongoose.model('Invitation', invitationSchema);

export const historySchema = new mongoose.Schema({
   invitationId:{type:mongoose.Schema.Types.ObjectId, ref:'Invitation'},
   date:{type:Date},
   action:{type:String}
},{
  versionKey:false,
  
})
const Histories = mongoose.model('Histories', historySchema);

invitationSchema.pre('save',function(){
  this.updated = new Date
})

invitationSchema.post('save',function(){
   // this.updated = new Date
    this.created = new Date
    if(!this.deleted)
    this.deleted = new String("False")

})
historySchema.post('save', function() {
this.date = new Date    

})


