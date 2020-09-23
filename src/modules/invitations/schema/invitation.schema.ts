import * as mongoose from 'mongoose';
import {Status} from '../models/invitation.interface'
export const invitationSchema = new mongoose.Schema({
   
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    organizationId:{type:mongoose.Schema.Types.ObjectId,ref:'Organization'},  
    notes:{type:String},
    status:{type:String,enum:Object.keys(Status).map(key=>Status[key]),default:Status.NEW},
    histories:[{type:mongoose.Schema.Types.ObjectId, ref:'Histories'}],
    created : {type:Date},
    updated : {type:Date},
    deleted : {type:Boolean, default:false},
    deletedDate : {type:Date}
},{
  versionKey:false,
  //timestamps:true
})
const Invitation = mongoose.model('Invitation', invitationSchema);

export const historySchema = new mongoose.Schema({
   invitationId:{type:mongoose.Schema.Types.ObjectId, ref:'Invitation'},
   date:{type:Date},
   action:{type:String,enum:Object.keys(Status).map(key=>Status[key]),default:Status.NEW}
},{
  versionKey:false,
  
})
const Histories = mongoose.model('Histories', historySchema);

Invitation.find({}).populate('histories').exec()
invitationSchema.pre('save',function(){
  this.updated = new Date
})

invitationSchema.post('save',function(){
    
    this.created = new Date
})
historySchema.post('save', function() {
this.date = new Date    

})


