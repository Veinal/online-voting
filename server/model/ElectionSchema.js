const mongoose=require('mongoose');
const {Schema}=mongoose

const ElectionSchema=new Schema({
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
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String
    }
})
module.exports=mongoose.model("Elections")