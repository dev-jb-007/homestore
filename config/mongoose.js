const mongoose=require('mongoose');
require('dotenv').config();
const URL='mmongodb+srv://dev_jb_007:Dev@2002@cluster0.ibx33.mongodb.net/HomeStore?retryWrites=true&w=majority';

const connection=mongoose.connect(URL,{
    useCreateIndex:true, 
    useUnifiedTopology:true,
    useFindAndModify:true,
    useNewUrlParser:true
});
module.exports=connection;