import db from '../db/query.js';

const deleteMessage=async (req,res,next)=>{
  const user=req.isAuthenticated()? req.user:null;
  if(!user)
  {
    res.redirect("/login");
    return;
  }
  if(!user.is_admin){
    res.redirect("/messages");
    return;
  }
  try{
    const message_id=req.params.message_id;
    await db.deleteMessage(message_id);
    res.redirect("/messages");
  }catch(err){
    next(err);
  }

}

export default deleteMessage;