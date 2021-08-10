const express=require('express');
const path=require('path');
const http=require('http');
const hbs=require('hbs');
const partials=require('partials');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const app=express();
const DatabaseConnection=require('./config/mongoose');
//ROUTERS
const userRouter=require('./routers/userRouter');
const productRouter=require('./routers/productRouter');
const paymentRouter=require('./routers/paymentRouter');

//CONNECTING TO DATABASE
DatabaseConnection
.then(()=>{
    console.log(`Successfully connected to store Database`);
})
.catch(err=>{
    console.log(err);
})

//STORING SESSIONS
app.use(session({
    name:'Session-Id',
    saveUninitialized:false,
    resave:false,
    secret:'this is our server',
    store: MongoStore.create({
        mongoUrl:'mmongodb+srv://dev_jb_007:Dev@2002@cluster0.ibx33.mongodb.net/HomeStore?retryWrites=true&w=majority',
        collectionName:'sessions'
    }),
    cookie:{
        secure:false
    }

}))



//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/static')))

//SETTING ENGINES
app.set('views',path.join(__dirname,'/templates/views'));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,'/templates/partials'));

//ROUTERS
app.get('/',(req,res,next)=>{
    res.statusCode=200;
    res.render('homepage');
})
app.get('/cart',(req,res,next)=>{
    res.render('cart');
})
app.get('/addproduct',(req,res,next)=>{
    res.render('addproduct');
})
app.get('/products',(req,res,next)=>{
    res.statusCode=200;
    res.render('searchpage');
})
app.get('/test',(req,res,next)=>{
    res.statusCode=200;
    res.render('test');
})
app.get('/addproduct/images',(req,res,next)=>{
    res.render('addimage');
})
app.use('/users',userRouter);
app.use('/product',productRouter);
app.use('/payment',paymentRouter);
//ERROR HANDLER
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.setHeader('Content-Type','application/json');
    res.json({error:err.message})
  });
//CREATING SERVER
const server=http.createServer(app);
server.listen(3000,'localhost',()=>{
    console.log('Successfully connected to server');
});