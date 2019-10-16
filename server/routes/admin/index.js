module.exports = app =>{
    const express = require('express')
    const router = express.Router() //express的子路由
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    router.post('/categories',async(req,res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.put('/categories/:id',async(req,res) => {
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/categories/:id',async(req,res) => {
        const model = await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/categories',async(req,res) => {
        const items = await Category.find()
        res.send(items)
    })
    //获取分类详情页接口
    router.get('/categories/:id',async(req,res) => {
        console.log('ok');
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    //文章相关
    router.post('/articles',async(req,res) => {
        const model = await Article.create(req.body)
        res.send(model)
    })
    router.put('/articles/:id',async(req,res) => {
        const model = await Article.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/articles/:id',async(req,res) => {
        const model = await Article.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/articles',async(req,res) => {
        const items = await Article.find()
        res.send(items)
    })
    //获取分类详情页接口
    router.get('/articles/:id',async(req,res) => {
        console.log('ok');
        const model = await Article.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api',router)  //将子路由挂载到app实例上

    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

}