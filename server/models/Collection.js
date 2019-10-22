const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String},
    link:{type:String},
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Collection',schema)