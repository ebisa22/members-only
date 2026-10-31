import bcrypt from "bcryptjs";
import db from '../db/query.js';


const createUser = async (req, res) => {
     try{
     const hashedPassword=await bcrypt.hash(req.body.password,10);
     const hashedSecurityAnswer=await bcrypt.hash(req.body.security_answer,10);
     const user = {
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       username: req.body.username,
       password: hashedPassword,
       security_question: req.body.security_question,
       security_answer: hashedSecurityAnswer,
     };
     await db.createUser(user);
     res.redirect("/login");
     }catch(err){
        console.log(err);
        throw err
     }
     
};

export default createUser;
