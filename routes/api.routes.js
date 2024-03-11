const express=require('express');
const {UserModel}=require('../modals/user.model');
const {FlightModel}=require('../modals/flight.model');
const bcrypt=require('bcrypt')
const api=express.Router();

api.post('/register',async(req,res)=>{
   const {name,email,password}=req.body;
   try{
    const existingUser=await UserModel.findOne({email})
    if(existingUser){
        return res.status(400).json({error:"Email already registered.Please Login!!"})
    }
    const hashedPass=await bcrypt.hash(password,5);
    await UserModel.create({name,email,password:hashedPass});
    res.status(201).json({mesg:"User registered Succesfully"});
   }catch(err){
    res.status(500).json({err});
   }
})
api.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({error:"Invalid email"})
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({err:"Invalid password"});
        }
        const token =jwt.sign({email},'masai');
        res.status(200).json({token});
    }catch(err){
        res.status(500).json(err);
    }
})

api.get('/flights',async(req,res)=>{
 try{
    const flights=await FlightModel.find();
    if(!flights||flights.length===0){
        return res.status(404).json({err:"No flight Found"});
    }
    res.status(200).json(flights);
 }catch(err){
    res.status(400).json(err);
 }
})

api.get('flights/:id',async(req,res)=>{
    const flightId=req.params.id;
    try{
        const flight=await FlightModel.findById(flightId);
        if(!flight){
            return res.status(404).json({err:"Flight Not Found"});
        }
        res.status(200).json(flight);
    }catch(err){
        res.status(500).json({err:"Internal server Error"});
    }
});

api.patch('flights/:id',async(req,res)=>{
  const flightId=req.params.id;
  const updatedData=req.body;
  try{
    const flight=await FlightModel.findByIdAndUpdate(flightId,updatedData,{new:true});
    if(!flight){
        return res.status(404).json({err:"Flight Not Found"});
    }
    res.status(200).json(flight);
  }catch(err){
    res.status(500).json({err:"Internal Server error"});
  }
})
api.delete('flights/:id',async(req,res)=>{
    const flightId=req.params.id;
   
    try{
      await FlightModel.findByIdAndDelete(flightId,updatedData,{new:true});
     
      res.status(200).json({msg:"Flight deleted"});
    }catch(err){
      res.status(500).json({err:"Internal Server error"});
    }
  })

  
