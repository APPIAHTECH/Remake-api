const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type:String,
        required: true
    }
}, { timestamps: true})

module.exports = model("Category", categorySchema)