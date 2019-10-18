module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Article = require('../../models/Article')
    const TalkOther = require('../../models/TalkOther')
    const Collection = require('../../models/Collection')
    router.get('/articles',async(req,res) => {
        console.log('ok');
        const items = await Article.find()
        res.send(items)
    })
    app.use('/web/api',router)
}