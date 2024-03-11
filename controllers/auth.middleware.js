const jwt= require('jsonwebtoken');

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(token){
        try{
            const decoded=jwt.verify(token,"masai");
            if(decoded){
                req.body.userId=decoded._id;
                req.body.name=decoded.name;
                next();
            }else{
                res.json({mesg:"User not Authorised"});
            }
        }catch(err){
            console.log(err);
        }
    }else{
        res.json({msg:"Please Login"});
    }
}

module.exports={auth};