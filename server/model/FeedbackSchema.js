const mongoose=require('mongoose');
const {Schema}=mongoose

const FeedbackSchema=new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserDetails"
    },
    feedback:{
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
module.exports=mongoose.model("Feedbacks",FeedbackSchema)