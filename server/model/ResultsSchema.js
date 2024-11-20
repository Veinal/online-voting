const mongoose=require('mongoose')
const {Schema}=mongoose

const ResultSchema=new Schema({
    election_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Elections"
    },
    winner:{
        type:String
    },
    totalVotes:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:"dont display"
    }
})
module.exports=mongoose.model("Results",ResultSchema)