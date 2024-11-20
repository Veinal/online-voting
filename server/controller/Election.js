const ElectionSchema=require('../model/ElectionSchema');
const VotesSchema=require('../model/VotesSchema')
const ResultSchema=require('../model/ResultsSchema')
const CandidateSchema=require('../model/CandiSchema')
const mongoose=require('mongoose')


const Insert=async(req,res)=>{
    try{
        const {candidates,electionName,description,startDate,endDate,batch,date,status}=req.body;
        const data=await new ElectionSchema({candidate_id:candidates,electionName,description,startDate,endDate,batch,date,status})
        const savedData=await data.save()
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
        const data=await ElectionSchema.find().populate({
            path: 'candidate_id', // Populate the candidates
            populate: {
              path: 'user_id', // Populate the user details within each candidate
            }
          });
        // console.log(data,"view all candidates")
        res.json(data)
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const SingleView=async(req,res)=>{
    try{
        let data=await ElectionSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            // console.log(data,"singleview data")
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
        let data=await ElectionSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            data=await ElectionSchema.findByIdAndDelete(req.params.id);
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
    const {candidate_id,electionName,description,startDate,endDate,batch,date,status}=req.body
    try{
        const newData={}
        if(candidate_id){newData.candidate_id=candidate_id}
        if(electionName){newData.electionName=electionName}
        if(description){newData.description=description}
        if(startDate){newData.startDate=startDate}
        if(endDate){newData.endDate=endDate}
        if(batch){newData.batch=batch}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data=await ElectionSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this Id")
            return res.status(404).send("Data doesn't exist with this Id")
        }else{
            data=await ElectionSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(err){
        console.error("some error occurred")
        res.status(500).json("some internal error")
    }
}

const calculateElectionResult = async (req, res) => {
    try {
        const { id } = req.params; // Extract electionId from URL parameters

        // Log the incoming request params for debugging
        console.log("Request params:", id);

        if (!id) {
            return res.status(400).json({ error: "Election ID is required" });
        }

        // Fetch all votes for the given election
        const votes = await VotesSchema.aggregate([
            { $match: { election_id: new mongoose.Types.ObjectId(id) } }, // Match by id
            {
                $group: {
                    _id: "$candidate_id", // Group votes by candidate
                    voteCount: { $sum: 1 } // Count total votes for each candidate
                }
            },
            { $sort: { voteCount: -1 } } // Sort by vote count in descending order
        ]);

        if (!votes || votes.length === 0) {
            return res.status(404).json({ error: "No votes found for this election" });
        }

        // Determine the winner
        const winnerData = votes[0]; // Candidate with the highest vote count
        const winnerCandidate = await CandidateSchema.findById(winnerData._id).populate('user_id');

        if (!winnerCandidate) {
            return res.status(404).json({ error: "Winner candidate not found" });
        }

        const winnerName = winnerCandidate.user_id.userName; // Assuming user schema has a 'userName' field
        const totalVotes = winnerData.voteCount;

        // Update the result collection
        const resultUpdate = await ResultSchema.findOneAndUpdate(
            { election_id: id }, // Match result by election_id
            { $set: { winner: winnerName, totalVotes: totalVotes } },
            { new: true } // Return the updated document
        );

        if (!resultUpdate) {
            return res.status(404).json({ error: "Result entry not found for this election" });
        }

        res.status(200).json({
            success: true,
            message: "Election results calculated successfully",
            result: resultUpdate
        });
    } catch (err) {
        console.error("Error calculating election results:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports={Insert,View,SingleView,Delete,Update,calculateElectionResult}