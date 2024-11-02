const mongoose=require('mongoose')
const {Schema}=mongoose

const VotesSchema=new Schema({
    election_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Elections"
    },
    candidate_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidates"
    },
    account:{
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

module.exports=mongoose.model("VoteDetails",VotesSchema)