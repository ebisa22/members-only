import {passport} from "../auth.js";

const handleLogin=async (req,res,next)=>{
      passport.authenticate('local',(err,user,info)=>{
       if(err)
          return next(err);
       if(!user){
            res.render("login", {
              errorMessage: "Invalid email or password",
              errors: {},
              formData: {username:req.body.username},
            });
            return;
       }

       req.login(user,(err)=>{
        if(err){
         next(err);
         return;
        }
        res.redirect("/messages");
       })
      })(req,res,next);
}

export default handleLogin;
