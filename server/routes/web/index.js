module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Article = require('../../models/Article')
    const TalkOther = require('../../models/TalkOther')
    const Collection = require('../../models/Collection')
    router.get('/articles',async(req,res) => {
        const items = await Article.find()
        res.send(items)
    })
    router.get('/articles/:id',async(req,res)=>{
        const model = await Article.findById(req.params.id)
        res.send(model)
    })
    router.post('/articles/:id',async(req,res)=>{
        const model = await Article.findByIdAndUpdate(req.params.id,{})
        res.send(model)
    })
    app.use('/web/api',router)
}