const mongoose=require('mongoose')
const {Schema}=mongoose

const VotesSchema=new Schema({
    election_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Elections"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserDetails"
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