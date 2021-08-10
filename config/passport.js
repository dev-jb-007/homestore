const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

const customfield={
    usernameField:'email',
    passwordField:'password'
}
const verifyfunc=async (username,password,done)=>{
    try{
        const user=await User.findOne({email:username});
        if(!user)
        {
            done(null,false);
        }
        else{
            if(user.isPasswordValid(password))
            {   
                done(null,user);
            }
            else{
                done(null,false);
            }
        }
    }
    catch(err)
    {
        done(err); 
    }
}
const strategy=new LocalStrategy(customfield,verifyfunc);
passport.use(strategy);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((userid,done)=>{
    User.findById(userid)
    .then(user=>{
        done(null,user);
    })
    .catch((err)=>{
        done(err);
    })
})
