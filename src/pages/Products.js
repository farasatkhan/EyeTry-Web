const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: [{
        username: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    category: {
        type: String,
        enum: ['Eyeglasses', 'Sunglasses', 'Blue Light Blocking Glasses', 'Sports Glasses'],
        required: true
      }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
