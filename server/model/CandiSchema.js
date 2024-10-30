const mongoose=require('mongoose')
const {Schema}=mongoose;

const CandiSchema=new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserDetails"
    },
    // election_id:{
    // },
    manifesto:{
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
        type:String,
        default:"active"
    }
})
module.exports=mongoose.model("Candidates",CandiSchema)