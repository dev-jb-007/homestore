const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        validate(name) {
            if (!validator.isAlpha(name)) {
                throw new Error('Name must only contain Alphabets');
            }
        }
    },
    lastName: {
        type: String,
        required: true,
        validate(name) {
            if (!validator.isAlpha(name)) {
                throw new Error('Name must only contain Alphabets');
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Please Enter a valid Email');
            }
        }
    },
    phone: {
        type: Number,
        default: undefined,
        validate(phone) {
            if (phone.toString().length != 10) {
                throw new Error('Please enter a valid Phone Number');
            }
        }
    },
    primaryAddress: {
        type: String,
        required: true,
        maxLength: [500, 'Address Above 500 characters is not supported'],
    },
    password: {
        type: String,
        required: true,
        validate(password) {
            if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
                throw new Error('Please Enter a strong password');
            }
        }
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    bought: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    admin: {
        type: Boolean,
        default: false,
    },
    search: [
        {
            type: String
        }
    ],
    profileimage: {
        type: Buffer,
    },
    recent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
    //my orders
});
userSchema.methods.isPasswordValid = async function (password) {
    if (this.password == password) {
        return true;
    }
    else {
        return false;
    }
}
userSchema.pre('save', async function () {
    let user = this;
    if (user.search) {
        let length = this.search.length;
        if (length > 8) {
            for (let i = 0; i < length - 8; i++) {
                this.search.splice(i, 1);
            }
        }
    }

})
module.exports = mongoose.model('User', userSchema);