const mongoose=require('mongoose')
const {Schema}=mongoose;

const CandiSchema=new Schema({
    // user_id:{
    // },
    // election_id:{
    // },
    partyName:{
        type:String,
        required:true
    },
    symbol:{
        type:String
    },
    voteCount:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String
    }
})
module.exports=mongoose.model("Candidates")