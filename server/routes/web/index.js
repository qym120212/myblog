module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Article = require('../../models/Article')
    const TalkOther = require('../../models/TalkOther')
    const Collection = require('../../models/Collection')
    const Comment = require('../../models/Comment')
    //------------------------文章----------------------------------
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
    //------------------------随笔----------------------------------
    router.get('/talkothers',async(req,res) => {
        const items = await TalkOther.find()
        res.send(items)
    })
    router.get('/talkothers/:id',async(req,res)=>{
        TalkOther.findById(req.params.id, function (err, data) {
            if (err) res.send(err)
            else {
                    res.send(data)
                    TalkOther.findByIdAndUpdate(data._id, { pageviews: data.pageviews + 1 },()=>{})
            }
    })
    //     const model = await TalkOther.findById(req.params.id)
    //     TalkOther.findByIdAndUpdate(req.params.id,{ pageviews:model.pageviews + 1 })
    //     res.send(model)
     })
    router.put('/talkothers/:id',async(req,res)=>{
        const model = await TalkOther.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true
        })
    })
      //------------------------收藏----------------------------------
      router.get('/collections',async(req,res) => {
        const items = await Collection.find()
        res.send(items)
    })
    router.get('/collections/:id',async(req,res)=>{
        Collection.findById(req.params.id, function (err, data) {
            if (err) res.send(err)
            else {
                    res.send(data)
                    Collection.findByIdAndUpdate(data._id, { pageviews: data.pageviews + 1 },()=>{})
            }
    })
    //     const model = await Collection.findById(req.params.id)
    //     Collection.findByIdAndUpdate(req.params.id,{ pageviews:model.pageviews + 1 })
    //     res.send(model)
     })
    router.put('/collections/:id',async(req,res)=>{
        const model = await Collection.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    //------------------------留言----------------------------------
    router.get('/comments',async(req,res) => {
        const items = await Comment.find()
        res.send(items)
    })
    router.post('/comments',async(req,res) => {
        const model = await Comment.create(req.body)
        res.send(model)
    })

    app.use('/web/api',router)
}