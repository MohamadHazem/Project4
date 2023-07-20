const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    year: {
        type: Number,
    },
}, {timestamps: true})

const Car = mongoose.model('Car', carSchema)

module.exports = Car