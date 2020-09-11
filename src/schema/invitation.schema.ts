import * as mongoose from 'mongoose';
export const invitationSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},  
    notes:{type:String},
    status:{type:String,enum:['New','Accepted','Rejected','Edited']},
    created:{type:Date},
    updated:{type:Date}
},{
	versionkey:false
})
invitationSchema.pre('save', function(next) {
  if (!this.created) 
  this.created = new Date;
  next();
})
invitationSchema.post('save',function(doc){
	if(this.action == 'Edited')
		this.updated = new Date;

	console.log("Success")
})