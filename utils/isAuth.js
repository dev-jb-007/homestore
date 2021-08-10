const User =require('../models/user');
const isAuth=async (req,res,next)=>{
    if(req.session.passport)
    {   
        if(req.session.passport.user)
        {   
            req.user=await User.findById(req.session.passport.user);
            next();
        }
        else{
            let err=new Error('Please Authenticate');
            next(err);
        }
    }
    else{
        let err=new Error('Please Authenticate');
        next(err);
    }
}
module.exports=isAuth;