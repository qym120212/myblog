const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{ type:String }
})

module.exports = mongoose.model('TalkOther',schema)