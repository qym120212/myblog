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
        Article.findById(req.params.id, function (err, data) {
            if (err) res.send(err)
            else {
                    res.send(data)
                    Article.findByIdAndUpdate(data._id, { pageviews: data.pageviews + 1 },()=>{})
            }
    })
    //     const model = await Article.findById(req.params.id)
    //     Article.findByIdAndUpdate(req.params.id,{ pageviews:model.pageviews + 1 })
    //     res.send(model)
     })
    router.put('/articles/:id',async(req,res)=>{
        const model = await Article.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    app.use('/web/api',router)
}