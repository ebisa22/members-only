import db from '../db/query.js';

const createMessage=async (req,res,next)=>{
      const user = req.isAuthenticated() ? req.user : null;
      if(!user){
        res.redirect("/login");
        return;
      }
    const  {title,text}=req.body;
    const message={
        user_id:user.user_id,
        title,
        text
    }
    try{
        await db.createMessage(message);
        res.redirect("/messages");
    }catch(err){
        next(err);
    }
} 

export default createMessage;