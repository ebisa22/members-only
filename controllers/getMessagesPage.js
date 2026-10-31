const getMessagesPage=async (req,res)=>{
      if (!req.isAuthenticated()) {
        // casuals here
      } else {
       const user=req.user;
       if (user.is_admin){
        //admin rendered
       }else if(user.is_member){
        //member rendered
       }else{
         //registred hree
       }
      }
}

export default getMessagesPage;