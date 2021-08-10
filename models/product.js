const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: String,
        default: '',
        maxLength: [100, 'review max length is 100 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
})
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: [500, 'You can only add dicription upto 500 characters.']
    },
    images: [
        {
            type: Buffer
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    ratingNumber: {
        type: Number,
        default: 0,
        validate(count) {
            if (count != 0) {
                throw new Error("You can't set ratingNumber of any product")
            }
        }
    },
    reviewNumber: {
        type: Number,
        default: 0,
        validate(count) {
            if (count != 0) {
                throw new Error("You can't set reviewNumber of any product")
            }
        }
    },
    viewsUser:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }

        ]
    ,
    comments: [commentSchema],
    categories: {
        type: String,
        required: true,
        validate(category) {
            const list = ['appliances', 'mobiles', 'electronics', 'fashion', 'grocery', 'home', 'beauty'];
            if (!list.includes(category)) {
                throw new Error('These Category is not defined in our database');
            }
        }
    },
    viewsCount: {
        type: Number,
        default: 0,
        validate(count) {
            if (count != 0) {
                throw new Error("You can't set views of any product")
            }
        }
    },
    purchasedCount: {
        type: Number,
        default: 0,
        validate(count) {
            if (count != 0) {
                throw new Error("You can't set purchase count of any product")
            }
        }
    },
    discount: {
        type: Number,
        default: 0,
        validate(dis) {
            if (dis > 100) {
                throw new Error("Discount Can't be above 100%");
            }
        }
    },
    SKU_ID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    key_specs: {
        type: String,
        default: '-',
        maxLength: [50, "You can't enter more than 50 characters"]
    },
    brand: {
        type: String,
        default: '-',
        maxLength: [50, "You can't enter more than 50 characters"]
    },
    manufacturer: {
        type: String,
        default: '-',
        maxLength: [50, "You can't enter more than 50 characters"]
    },
    model: {
        type: String,
        maxLength: [50, "You can't enter more than 50 characters"],
        required: true,
    },
    manufacturer_year: {
        type: Number,
        min: 1950,
        max: 2021,
        required: true,
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        maxLength: [20, "You can't enter more than 50 characters"]
    },
    expiry: {
        type: Number,
        default: 0,
    },
    self_life: {
        type: Number,
        default: 0,
    },
    package_length: {
        type: Number,
        required: true
    },
    package_width: {
        type: Number,
        required: true
    },
    package_height: {
        type: Number,
        required: true
    },
    package_weight: {
        type: Number,
        required: true
    },
    warrenty: {
        type: Number,
        default: 0
    },
    gaurentee: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        maxLength: [20, "You can't enter more than 50 characters"],
        default: '-'
    },
    instruction: {
        type: String,
        maxLength: [20, "You can't enter more than 50 characters"],
        default: '-'
    },
    net_quantity: {
        type: Number,
        min: 0,
        default: 1
    }
});
module.exports = mongoose.model('product', productSchema);