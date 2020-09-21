import * as mongoose from 'mongoose';
export const OrganizationSchema = new mongoose.Schema({
    name :{
        type:String,
        
    },
    users :[{
        _id:false,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        role:{type:String,enum:['Owner','Manager','Member'], default:'Member'}
    }],
    project :[{
        type:mongoose.Schema.Types.ObjectId,ref:'Project'
    }],
    invitationId :[{
        type:mongoose.Schema.Types.ObjectId,ref:'Invitation'
    }],
},{
    timestamps: true,
    versionKey: false
})
const Organization = mongoose.model('Organization', OrganizationSchema);