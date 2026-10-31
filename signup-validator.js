import {body,validationResult} from "express-validator";
import db from './db/query.js';

const securityQuestions = [
  "What was the name of your first school?",
  "What was the name of your childhood best friend?",
  "What city were you born in?",
  "What was your childhood nickname?",
  "What was the name of your first pet?",
  "What was your favorite childhood food?",
  "What was the first concert you attended?",
  "What was the name of your favorite childhood teacher?",
];

const checkUsernameAvailability=async(value)=>{
   try{
     const user=await db.getUserByUsername(value);
     if(user)
        return false
     else
        return true
   } catch(err){
      console.error(err);
      throw err;
    }
}
const checkConfirmPassword=async (value,{req})=>{
    return value === req.body.password
}
const validationFields = [
  body("first_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name required"),
  body("last_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name required"),
  body("username")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter valid email address")
    .bail()
    .custom(checkUsernameAvailability)
    .withMessage("Username already registered"),
  body("password")
    .isStrongPassword()
    .withMessage("Enter strong password"),
  body("confirmPassword")
    .custom(checkConfirmPassword)
    .withMessage("Passwords don't match"),
  body("security_question")
    .trim()
    .isIn(securityQuestions)
    .withMessage("Select a valid security question"),
  body("security_answer")
    .trim()
    .notEmpty()
    .withMessage("Security answer required"),
];

const validate=async(req,res,next)=>{
    const formData=req.body;
    const errors=validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    res.render("signup", {
      errors: errors.mapped(),
      formData,
      securityQuestions,
    });
}

export {validate,validationFields};