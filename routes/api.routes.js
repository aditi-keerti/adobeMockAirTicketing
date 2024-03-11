const express=require('express');
const {UserModel}=require('../modals/user.model');
const {FlightModel}=require('../modals/flight.model');
const {BookingModel}=require('../modals/booking.model');
const {auth}=require('../controllers/auth.middleware');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const api=express.Router();
api.use(express.json());

api.post('/register',async(req,res)=>{
   const {name,email,password}=req.body;
   try{
    const existingUser=await UserModel.findOne({email})
    if(existingUser){
        return res.status(400).json({error:"Email already registered.Please Login!!"})
    }
   bcrypt.hash(password,5,async(err,hash)=>{
    if(err){
        res.status(401).send({mesg:"Error mesg"})
    }else{
        const user=new UserModel({name,email,password:hash})
        await user.save();
        res.status(201).json({mesg:"User registered Succesfully"});
    }
   })
   
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
        bcrypt.compare(password,user.password,(err,pass)=>{
            if(err){
                res.status(400).json({err});
            }if(pass){
                const token =jwt.sign({userId:user._id},'masai');
                res.status(200).json({mesg:"Login succesfull",loginUser:user.name,token});
            }
        });
        
       
       
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

api.post('/flights',auth,async(req,res)=>{
  const payload=req.body;
  try{
    const flight=new FlightModel({payload});
    await flight.save();
    res.status(200).json({mesg:`Flight ${flight} is addded`});
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

api.post('/bookings',auth,async(req,res)=>{
    const {flightId}=req.body;
    const userId=req.user.userId;
    try{
        const flight=await FlightModel.findById(flightId);
        if(flight){
            const newbooking=new BookingModel({userId:userId,flightId})
            await newbooking.save();
            res.status(200).json({mesg:"Booking done"});
        }
    }
    catch(err){
        res.status(500).json({err:"Internal Server error"});
    }
})
module.exports={api};