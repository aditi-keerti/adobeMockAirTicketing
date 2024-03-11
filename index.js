const express=require("express");
const {connection}=require('./db');

const app=express();

app.get('/',(req,res)=>{
    res.send("Home Page")
})
app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Connected to db");
        console.log("Server is running at 8080");
    }catch(err){
        console.log(err);
    }
    
})