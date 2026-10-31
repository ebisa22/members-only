import { body, validationResult } from "express-validator";
const checkConfirmPassword = async (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Passwords don't match");
  }
  return true;
};

const validationFields= [
    body("password")
        .isStrongPassword()
        .withMessage("Enter strong password"),
      body("confirmPassword")
        .custom(checkConfirmPassword)
        .withMessage("Passwords don't match"),
   ];

const validate = async (req, res, next) => {
  const errors = validationResult(req);
  const { username } = req.body.password;
  if (!errors.isEmpty()) {
    res.render("/forgot-password", {
      step: "reset",
      username,
      securityQuestion: null,
      errorMessage: null,
      errors: errors.mapped(),
      formData: {},
    });
    return;
  }

  next();
};

export  {validate,validationFields};