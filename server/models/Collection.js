const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String},
    link:{type:String}
})

module.exports = mongoose.model('Collection',schema)