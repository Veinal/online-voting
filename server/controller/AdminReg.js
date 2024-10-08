const AdminSchema = require('../model/AdminSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET="admin"

const Register = async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword, date, status } = req.body;

        const data = await new AdminSchema({ adminName, adminEmail, adminPassword, date, status })
        const savedData = await data.save()
        console.log("Admin Registration sucess")
        res.send({ "Registration successful": true, savedData })
    }
    catch (err) {
        console.error("some error occurred!!" + err)
        res.status(500).json("some internal error")
    }
}

const Login = async(req,res)=>{
    const {adminEmail,adminPassword}=req.body;
    try{
        let admin =await AdminSchema.findOne({adminEmail})
        console.log(admin,"admin")
        if(!admin){
            return res.json({error:"Invalid credential email"})
        }
        // password

        const data=admin.id;
        console.log(admin.id)
        console.log("login success")
        res.json({"Login successful":true,data})
    }
    catch(err){
        console.error("some error occured!!"+err)
        res.status(500).json("some internal error!!")
    }
}

const View =async(req,res)=>{
    try{
        const data=await AdminSchema.find()
        console.log(data,"admin view data")
        res.json(data)
    }
    catch(err){
        console.error("some error occured!!"+err)
        res.status(500).json("some internal error!!")
    }
}

const SingleView =async (req,res)=>{
    try{
        let data=await AdminSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this Id")
            return res.status(404).send("Data doesnt exist with this ID")
        }
        else{
            console.log(data)
            res.json(data)
        }
    }
    catch(err){
        console.error("some error occured!!"+err)
        res.status(500).json("some internal error")
    }
}

const Delete=async(req,res)=>{
    try{
        let data=await AdminSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID")
            return res.status(404).send("Data does not exist with this Id")
        }
        else{
            data =await AdminSchema.findByIdAndDelete(req.params.id)
            console.log("Data Deleted successfully")
            res.json({"success":true,"Deleted data":data})
        }
    }
    catch(err){
        console.error("some error occured!!!")
        res.status(500).json("some internal error!!!")
    }
}

const Update=async(req,res)=>{
    const {adminName, adminEmail, adminPassword, date, status}=req.body;
    try{
        const newData={}
        if(adminName){newData.adminName=adminName}
        if(adminEmail){newData.adminEmail=adminEmail}
        if(adminPassword){newData.adminPassword=adminPassword}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data=await AdminSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this id")
            return res.status(404).send("Data does not exist with this ID")
        }else{
            data=await AdminSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

module.exports={Register,Login,View,SingleView,Delete,Update}