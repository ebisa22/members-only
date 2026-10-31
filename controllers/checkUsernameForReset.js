import db from '../db/query.js';

const checkUsernameForReset=async (req,res,next)=>{
    try{
        const username=req.body.username;
        const user=await db.getUserByUsername(username);
        if(!user){
      res.render("forgot-password", {
      step: "username",
      username:null,
      securityQuestion: null,
      errorMessage: "Account not found",
      formData: {username},
    });
    return;
        }
       req.session.resetUserId = user.user_id;
       res.render("forgot-password", {
         step: "question",
         username,
         securityQuestion: user.security_question,
         errorMessage: null,
         formData: {},
       });
    }catch(err){
        next(err);
    }
}

export default checkUsernameForReset;