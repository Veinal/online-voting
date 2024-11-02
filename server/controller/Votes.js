const VotesSchema = require('../model/VotesSchema');

const Insert=async(req,res)=>{
    try{
        const {electionID,candidateID,account,date,status}=req.body;
        const data=await new VotesSchema({election_id:electionID,candidate_id:candidateID,account,date,status})
        const savedData= await data.save()
        console.log("Insertion success")
        res.send({"Insertion success":true,savedData})
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const View=async(req,res)=>{
    try{
        const data=await VotesSchema.find();
        res.json(data)
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const Check=async(req,res)=>{
    const { electionID, account } = req.query;
    try {
        // Check if there's a vote for this user and election
        const hasVoted = await VotesSchema.exists({ election_id: electionID, account: account });
        res.json({ hasVoted: !!hasVoted }); // Returns true if vote exists, false otherwise
    } catch (error) {
        console.error("Error checking vote status", error);
        res.status(500).send("Error checking vote status");
    }
}

const SingleView=async(req,res)=>{
    try{
        let data=await VotesSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            console.log(data,"singleview data")
            res.json(data)
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const Delete=async(req,res)=>{
    try{
        let data=await VotesSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            data=await VotesSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully")
            res.json({"Deletion success":true,"Deleted data":data})
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("Some internal error")
    }
}

const Update=async(req,res)=>{
    const {election_id,candidate_id,account,date,status}=req.body
    try{
        const newData={}
        if(election_id){newData.election_id=election_id}
        if(candidate_id){newData.candidate_id=candidate_id}
        if(account){newData.account=account}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data=await VotesSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this Id")
            return res.status(404).send("Data doesn't exist with this Id")
        }else{
            data=await VotesSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(err){
        console.error("some error occurred")
        res.status(500).json("some internal error")
    }
}

module.exports={Insert,View,Check,SingleView,Delete,Update}