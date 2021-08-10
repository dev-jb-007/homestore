const User=require('../models/user');
const isAdmin=async (req,res,next)=>{
    const auth=req.session.passport.user;
    const user=await User.findById(auth);
    if(user.admin)
    {
        next();
    }
    else{
        let err=new Error('You are not an admin');
        next(err);
    }
}
module.exports=isAdmin;