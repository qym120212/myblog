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
    router.put('/articles/:id',async(req,res)=>{
        const model = await Article.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    app.use('/web/api',router)
}