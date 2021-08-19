const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const isAuth = require('../utils/isAuth');
const sharp = require('sharp');
const multer = require('multer');
require('../config/passport');
const otpemail = require('../config/email');
const otpGenerator = require('otp-generator');
const express_session = require('express-session')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());
let otpmain = '';

//CONFIGURE
const upload = multer({
    limits: {
        fileSize: 500000
    },
    fileFilter(req, file, done) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return done(new Error('Please Upload an Image'));
        }
        done(undefined, true);
    }
})

// login----------------------------------------------------------------------------
router.route('/login')
    .post(passport.authenticate('local'), async (req, res, next) => {
        try {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json('Login Successful');
        }
        catch (err) {
            next(err);
        }
    })
    .get(async (req, res, next) => {
        res.statusCode = 200;
        res.render('login');
    })
// signup----------------------------------------------------------------------------
router.route('/signup')
    .post(async (req, res, next) => {
        try {
            const user = new User(req.body);
            if (req.body.cartid) {
                req.body.cartid.forEach(element => {
                    user.cart.push(element);
                });
            }
            if (req.body.buyid) {
                req.body.buyid.forEach(element => {
                    user.bought.push(element);
                });
            }
            const result = await user.save();
            // const ans=await result.populate('cart').exec();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    });
router.route('/signup1')
    .get((req, res, next) => {
        otpmain = '';
        res.render('signup1');
    })
router.route('/signup2')
    .get((req, res, next) => {
        if (req.query.otp == otpmain) {
            res.statusCode = 200;
            res.render('signup2');
        }
        else {
            otpmain = '';
            res.redirect('../../users/signup1');
        }
    })
// OTP----------------------------------------------------------------------------
router.route('/otp')
    .post((req, res, next) => {
        let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        otpmain = otp;
        otpemail(req.body.email, otp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json('otp generated');
    })
// signout----------------------------------------------------------------------------
router.route('/signout')
    .get(isAuth, (req, res, next) => {
        req.session.destroy();
        res.clearCookie('Session-Id');
        res.statusCode = 200;
        res.end('done');
    })
// test----------------------------------------------------------------------------
router.route('/')
    .get(async (req, res, next) => {
        const user = await User.find({}).populate(['cart', 'bought']);
        res.statusCode = 200;
        res.json(user);
    })
//update----------------------------------------------------------------------------
router.route('/update')
    .put(isAuth, async (req, res, next) => {
        try {
            const updates = Object.keys(req.body);
            const allowedUpdates = ['firstName', 'lastName', 'password', 'cart', 'bought', 'primaryAddress', 'phone'];
            const isUpdateValid = updates.every(update => allowedUpdates.includes(update));
            if (isUpdateValid) {
                const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }
            else {
                let err = new Error('These Update field is not Avalaible');
                next(err);
            }
        }
        catch (err) {
            next(err);
        }
    })
router.route('/updatesearch')
    .post(isAuth, async (req, res, next) => {
        try {
            req.user.search.push(req.body.search);
            req.user.save();
            res.end('done');
        }
        catch (err) {
            next(err);
        }
    })
router.route('/profileimg')
    .post(isAuth, upload.single('profile_image'), async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);
            const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).png().toBuffer();
            user.profileimage = buffer;
            await user.save();
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain');
            res.end('Image Uploaded');
        }
        catch (err) {
            next(err);
        }

    })
    .get(isAuth, async (req, res, next) => {
        try {
            if (req.user.profileimage) {
                res.setHeader('Content-Type', 'image/png');
                res.send(req.user.profileimage);
            }
            else {
                throw new Error('User dont have any image');
            }
        }
        catch (err) { next(err) }
    })
//cart------------------------------------------------------------------------------------------------------------------------
router.route('/cart')
    .get(isAuth, async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id, 'cart').populate('cart', 'title description price discount id');
            res.send(user);
        }
        catch (err) { next(err) }
    })
    .post(isAuth, async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id,'cart');
            console.log(user);
            if (!user.cart.includes(req.query.id)) {
                user.cart.push(req.query.id);
            }
            console.log(user);
            await user.save();
            console.log(user);
            res.send('Added');
        }
        catch (err) { next(err) }
    })
    .delete(isAuth, async (req, res, next)=>{
        try {
            const user = await User.findById(req.user._id,'cart');
            for(let i=user.cart.length-1;i>=0;i--) {
                console.log(user.cart[i]==req.body.id)
                if(user.cart[i]==req.body.id) {
                    user.cart.splice(i,1);
                    break;
                }
            }
            await user.save();
            res.send({message:"deleted"});
        }
        catch (err) { next(err) }
    })
// Recent Viewed---------------------------------------------------------------------
router.route('/recent')
    .get(isAuth, async (req, res, next) => {
        try {
            res.setHeader('Content-Type', 'text/plain');
            const result = await User.findById(req.user._id, 'recent').populate('recent', 'title description id');
            res.send(result);
        }
        catch (err) {
            next(err);
        }
    })
router.route('/recentsearch')
    .get(isAuth, async (req, res, next) => {
        try {
            res.send(req.user.search);
        }
        catch (err) {
            next(err);
        }
    })
module.exports = router;