const ResultSchema = require('../model/ResultsSchema');

const Insert = async (req, res) => {
    try {
        const { electionId, winner, date, status } = req.body;

        // Check if a result for the given election ID already exists
        const existingResult = await ResultSchema.findOne({ election_id: electionId });
        if (existingResult) {
            console.log("Duplicate entry for result");
            return res.status(400).json({ success: false, message: "Result for this election already exists." });
        }

        // Create a new ResultSchema instance
        const data = new ResultSchema({ election_id: electionId, winner, date, status });

        // Save the new result to the database
        const savedData = await data.save();  // Await the save operation

        console.log("Insertion success");
        return res.status(201).json({ success: true, savedData });  // Send back success status and saved data
    }
    catch (err) {
        console.error("An error occurred: " + err);
        return res.status(500).json({ success: false, message: "Internal server error." });  // Include a structured response
    }
};


const View = async (req, res) => {
    try {
        const data = await ResultSchema.find().populate({
            path: "election_id",
            populate: {
                path: "candidate_id",
                populate: {
                    path: "user_id"
                }
            }
        });
        // console.log(data,"view all candidates")
        res.json(data)
    }
    catch (err) {
        console.error("some error occurred" + err)
        res.status(500).json("some internal error")
    }
}

const SingleView = async (req, res) => {
    try {
        let data = await ResultSchema.findById(req.params.id).populate("election_id")
        if (!data) {
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        } else {
            console.log(data, "singleview data")
            res.json(data)
        }
    }
    catch (err) {
        console.error("some error occurred" + err)
        res.status(500).json("some internal error")
    }
}

const Delete = async (req, res) => {
    try {
        let data = await ResultSchema.findById(req.params.id);
        if (!data) {
            console.log("Data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        } else {
            data = await ResultSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully")
            res.json({ "Deletion success": true, "Deleted data": data })
        }
    }
    catch (err) {
        console.error("some error occurred" + err)
        res.status(500).json("Some internal error")
    }
}

const Update = async (req, res) => {
    const {election_id, winner, date, status } = req.body
    try {
        const newData = {}
        if (election_id) { newData.election_id = election_id }
        if (winner) { newData.winner = winner }
        if (date) { newData.date = date }
        if (status) { newData.status = status }

        let data = await ResultSchema.findById(req.params.id)
        if (!data) {
            console.log("Data not found with this Id")
            return res.status(404).send("Data doesn't exist with this Id")
        } else {
            data = await ResultSchema.findByIdAndUpdate(req.params.id, { $set: newData })
            res.json({ data })
        }
    }
    catch (err) {
        console.error("some error occurred")
        res.status(500).json("some internal error")
    }
}

module.exports = { Insert, View, SingleView, Delete, Update }