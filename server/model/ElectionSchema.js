const mongoose=require('mongoose');
const {Schema}=mongoose

const ElectionSchema=new Schema({
    candidate_id:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Candidates"  
    }],
    electionName:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    batch:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String
    }
})
module.exports=mongoose.model("Elections",ElectionSchema)