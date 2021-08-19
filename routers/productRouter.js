const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const hbs = require('hbs');
const partials = require('partials');
router.use(express.json());
const multer = require('multer');
const sharp = require('sharp');
router.use(express.urlencoded({ extended: true }));
const isAuth = require('../utils/isAuth');
const isAdmin = require('../utils/isAdmin');
const User = require('../models/user');
const upload = multer({
    limits: {
        fileSize: 500000
    },
    fileFilter(req, file, done) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return done(new Error('Please Upload an image'));
        }
        done(undefined, true);
    }
})
// DEFAULT ROUTE---------------------------------------------------------------------
router.route('/recommandations')
    .post(async (req, res, next) => {
        try {
            let words = req.body.value.split(' ');
            let result = ``;
            // (?=.*jack)(?=.*james)
            words.forEach(element => {
                result += `(?=.*${element})`;
            });
            const products = await Product.find({ title: { $regex: `${result}`,$options:'i' } }, 'title', { limit: 8 });
            res.send(products);
        }
        catch (err) {
            next(err);
        }
    })
router.route('/searchproduct')
    .post(async (req, res, next) => {
        try {
            let words = req.body.value.split(' ');
            let result = ``;
            words.forEach(element => {
                result += `(?=.*${element})`;
            });
            let products1 = await Product.find({ title: { $regex: `${result}`,$options:'i'}});
            result = ``;
            result += `(${words[0]})`;
            for (let i = 1; i < words.length; i++) {
                result += `|(${words[i]})`;
            }
            let products2 = await Product.find({ title: { $regex: `${result}`,$options:'i'}});
            let indexes = new Array();
            products2.forEach((element, index) => {
                products1.forEach(item => {
                    if (item._id.toString() == element._id.toString()) {
                        indexes.push(index);
                    }
                })
            })
            for (let i = indexes.length - 1; i >= 0; i--) {
                products2.splice(indexes[i], 1);
            }
            const product = [...products1, ...products2];
            res.send(product);

        }
        catch (err) { next(err) }
    })
router.route('/')
    .post(isAuth, async (req, res, next) => {
        try {
            const product = await Product.create(req.body);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }
        catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            res.statusCode = 200;
            res.render('productpage');
        }
        catch (err) {
            next(err);
        }
    })
    .put(isAuth, isAdmin, async (req, res, next) => {
        try {
            const product = await Product.findByIdAndUpdate(req.query.id, { $inc: { viewsCount: 1 } });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product.viewsCount);
        }
        catch (err) {
            next(err);
        }
    })
router.route('/uploadcomments')
    .post(isAuth, async (req, res, next) => {
        try {
            let product = await Product.findById(req.query.id);
            product.comments.push({ reviews: req.body.reviews, rating: req.body.rating, author: req.user._id });
            const user=await User.findById(req.user._id,['firstName','lastName']);
            await product.save();
            res.send(user);
        }
        catch (err) {
            next(err);
        }
    })
router.route('/mostviewed')
    .get(async (req,res,next)=>{
        try{
            const product = await Product.find({},['title','description','_id'],{
                limit:8,
                sort:{
                    viewsCount:-1
                }
            })
            res.send(product);
        }
        catch(err)
        {
            next(err);
        }
    })
router.route('/singleproduct')
    .get(async (req, res, next) => {
        try {
            const product = await Product.findById(req.query.id).populate('comments.author', 'firstName lastName');
            if(req.session.passport)
            {
                const id = req.session.passport.user;
                let user = await User.findById(id);
                if(user)
                {
                    if(!product.viewsUser.includes(user._id)) {
                        product.viewsUser.push(user._id);
                        product.viewsCount++;
                    }
                    if(user.recent.length==0) {
                        user.recent.push(req.query.id);
                    }
                    else if(!user.recent.includes(req.query.id)) {
                        if (user.recent.length == 4) {
                            user.recent.shift();
                        }
                        user.recent.push(req.query.id);
                    }
                    
                    await user.save();
                }
            }
            await product.save();
            res.statusCode = 200;
            res.send(product);
        }
        catch (err) {
            next(err);
        }
    })
// IMAGE UPLOAD--------------------------------------------------------------------
router.route('/:productid/images')
    .post(isAuth, upload.array('multi-images'), async (req, res, next) => {
        try {
            if (req.params.productid) {
                let product = await Product.findById(req.params.productid);
                for (let i = 0; i < req.files.length; i++) {
                    let buffer = await sharp(req.files[i].buffer).resize({ width: 300, height: 300 }).png().toBuffer();
                    product.images.push(buffer);
                }
                await product.save();
                res.end('Images saved successfully')
            }
            else {
                throw new Error('Please try again with valid product id');
            }

        }
        catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            let product = await Product.findById(req.params.productid);
            res.set('Content-Type', 'image/png');
            if (!product.images[req.query.image]) {
                throw new Error('Image not found');
            }
            res.send(product.images[req.query.image]);
        }
        catch (err) {
            next(err);
        }
    })
router.route('/single')
    .get(async (req, res, next) => {
        try {
            const product = await Product.findById(req.query.id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product.viewsCount);
        }
        catch (err) {
            next(err);
        }
    })
router.route('/recommandation')
    .get(async (req,res,next)=>{
        try{
            const product=await Product.findById(req.query.id,['title']);
            const x=product.title.split(' ');
            let words=new Array();
            x.forEach(element=>{
                element = element.replace(/,/g,"");
                words.push(element);
            })
            result = ``;
            result += `(${words[0]})`;
            for (let i = 1; i < words.length; i++) {
                result += `|(${words[i]})`;
            }
            const recProduct=await Product.find({title:{$regex:`${result}`,$options:'i'}},['title','description']);
            regex=new RegExp(result,'gi');
            let map=new Map();
            recProduct.shift();
            recProduct.forEach((element,index)=>{
                map.set(index,element.title.match(regex).length);
            })
            map[Symbol.iterator] = function* () {
                yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
            }
            let arr=new Array();
            map=[...map];
            for(let i=0;i<map.length;i++)
            {
                arr.push(recProduct[map[i][0]]);
            }
            res.send(arr);
        }
        catch(err)
        {
            next(err);
        }
    })
module.exports = router;