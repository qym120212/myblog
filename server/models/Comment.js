const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    body:{type:String},
    headIndex:{type:Number,default:1}
})

module.exports = mongoose.model('Comment',schema)