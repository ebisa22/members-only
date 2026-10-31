const getForgotPasswordPage=async (req,res,next)=>{
    res.render("forgot-password", {
      step: "username",
      username: null,
      securityQuestion: null,
      errorMessage: null,
      formData: {},
    });
}

export default getForgotPasswordPage;