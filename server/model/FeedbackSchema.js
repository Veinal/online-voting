const mongoose=require('mongoose');
const {Schema}=mongoose

const FeedbackSchema=new Schema({
    // user_id:{},
    feedback:{
        type:String
    },
})
module.exports=mongoose.model("Feedbacks")