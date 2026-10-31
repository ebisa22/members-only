import {body,validationResult} from 'express-validator';


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