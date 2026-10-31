import bcrypt, { hash } from "bcryptjs";
import db from '../db/query.js';


const resetPassword = async (req, res) => {
     const user_id = req.session.resetUserId;
     const {password}=req.body;
     const hashed_password=await bcrypt.hash(password,10);
     try{
        await db.resetPassword(user_id,hashed_password);
        res.redirect("/login");
        delete req.session.resetUserId;
     }catch(err){
        next(err);
     }
};

export default resetPassword;
