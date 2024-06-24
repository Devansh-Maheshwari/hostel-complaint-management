const jwt=require("jsonwebtoken");

const authorizeWarden=async(req,res,next)=>{
    try{
        const token=req.header.authorization;
        const decodetoken=jwt.verify(token,process.env.JWT_SECRET);
        if(decodetoken.user.type==="warden"){
            return next();
        }
        else{
            return res.status(403).json({ error: "Unauthorized for warden" });
   
        }
    }catch(err){ 
        return res.status(401).json({ error: "Unauthorized" });
    }
}

const authorizeStudent=async(req,res,next)=>{
    try{
        const token=req.header.authorization;
        const decodetoken=jwt.verify(token,process.env.JWT_SECRET);
        if(decodetoken.user.type==="student"){
            return next();
        }
        else{
            return res.status(403).json({ error: "Unauthorized for student" });
   
        }
    }catch(err){ 
        return res.status(401).json({ error: "Unauthorized" });
    }
}

const authorizeComplaintRoute=async(req,res,next)=>{
    try{
        const token=req.header.authorization;
        const decodetoken=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodetoken)
        return next();
        
    }catch(err){ 
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = {
    authorizeWarden,
    authorizeStudent,
    authorizeComplaintRoute
  };