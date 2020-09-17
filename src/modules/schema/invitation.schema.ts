import * as mongoose from 'mongoose';
import {Status} from '../models/invitation.interface'
export const invitationSchema = new mongoose.Schema({
   
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    organizationId:{type:mongoose.Schema.Types.ObjectId,ref:'Organization'},  
    notes:{type:String},
    status:{type:String,enum:Object.keys(Status).map(key=>Status[key]),default:Status.NEW},
    histories:[{type:mongoose.Schema.Types.ObjectId, ref:'Histories', autopopulate:true}],
    deleted : {type:String}
},{
  versionKey:false,
  timestamps:true
})
const Invitation = mongoose.model('Invitation', invitationSchema);
invitationSchema.plugin(require('mongoose-autopopulate'));

export const historySchema = new mongoose.Schema({
   invitationId:{type:mongoose.Schema.Types.ObjectId, ref:'Invitation', autopopulate:true},
   date:{type:Date},
   action:{type:String}
},{
  versionKey:false,
  
})
const Histories = mongoose.model('Histories', historySchema);
historySchema.plugin(require('mongoose-autopopulate'));
/*
invitationSchema.pre('save', function() {
  
  this.created = new Date;
  
})
invitationSchema.pre('save',function(){
    if(invitationSchema.updated)
    this.updated = new Date


})
*/
/*  this.action = new String("Updated")
});*/
invitationSchema.post('save',function(){
    if(!this.deleted)
    this.deleted = new String("False")

})
historySchema.post('save', function() {
this.date = new Date    

})


