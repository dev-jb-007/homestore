const mongoose=require('mongoose');
require('dotenv').config();
const URL=process.env.MONGO_URL;

const connection=mongoose.connect(URL,{
    useCreateIndex:true, 
    useUnifiedTopology:true,
    useFindAndModify:true,
    useNewUrlParser:true
});
module.exports=connection;