const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },

    description:{
        type:String,
        required: true
    },

    photo:{
        type:String,
        required: false,
        default: ""
    },

    username:{
        type:String,
        required: true
    },

    categories:{
        type: Array,
        required: false
    }
}, { timestamps: true})

module.exports = mongoose.model("Post", postSchema)