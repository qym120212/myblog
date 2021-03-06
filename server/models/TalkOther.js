const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{ type:String },
    date: { type:String },
    comments:[],
    pageviews:{ type:Number,default: 0 },
    likecount:{ type:Number,default: 0 }
})

module.exports = mongoose.model('TalkOther',schema)