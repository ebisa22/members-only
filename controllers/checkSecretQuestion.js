import db from '../db/query.js';
import bcrypt from 'bcryptjs';

 const checkSecretQuestion=async (req,res,next)=>{
    const user_id = req.session.resetUserId;
    try{
        const user=await db.getUserById(user_id);
        const {username,security_answer}=req.body;
        const matched_answer=await bcrypt.compare(security_answer,user.security_answer);
    if(!matched_answer){
         res.render("forgot-password", {
           step: "question",
           username,
           securityQuestion: user.security_question,
           errorMessage: "Incorrect security answer. Please try again.",
           formData: {},
         });
         return;
    }
    res.render("forgot-password", {
      step: "reset",
      username,
      securityQuestion: null,
      errorMessage: null,
      formData: {},
    });
    }catch(err){
        next(err);
    }
}

export default checkSecretQuestion;