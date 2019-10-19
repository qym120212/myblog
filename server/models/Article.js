const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{ type:String },
    date: { type: Date, default: Date.now },
    comments:[]
})

module.exports = mongoose.model('Article',schema)