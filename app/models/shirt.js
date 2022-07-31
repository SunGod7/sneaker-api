// import dependencies
const mongoose = require('mongoose')

// toy is a subdocument NOT A MODEL
// toy will be part of the toys array added to specific pets

// we dont, DO NOT, need to get the model from mongoose, so we're going to save a lil real estate in our file and skip destructuring, in favor of the regular syntax
const shirtSchema = new mongoose.Schema({
    color: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    
    graphic: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String,
        // here we're going to use enum, which means we can only use specific strings to satisfy this field.
        // enum is a validator on the type String, that says "you can only use one of these values"
        enum: ['T-shirt', 'Long sleeve T-shirt', 'Sweatshirt', 'Hoodie'],
        default: 'Hoodie'
    }
}, {
    timestamps: true
})

module.exports = shirtSchema