module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const router = express.Router() //express的子路由
    const Article = require('../../models/Article')
    const TalkOther = require('../../models/TalkOther')
    const Collection = require('../../models/Collection')
    const AdminUser = require('../../models/AdminUser')
    const Comment = require('../../models/Comment')

    //登录校验中间件
    const auth = async(req,res,next)=>{
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'请先登录')
        const { id } = jwt.verify(token,'asfgnklw')
        assert(id,401,'请先登录')
        req.user = await AdminUser.findById(id)
        assert(req.user,401,'请先登录')

        await next()
    }
    //----------------------------------------------------------------------------文章相关
    router.post('/articles',auth,async(req,res) => {
        const model = await Article.create(req.body)
        res.send(model)
    })
    router.put('/articles/:id',auth,async(req,res) => {
        const model = await Article.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/articles/:id',auth,async(req,res) => {
        const model = await Article.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/articles',auth,async(req,res) => {
        const items = await Article.find()
        res.send(items)
    })
    router.get('/articles/:id',auth,async(req,res) => {
        const model = await Article.findById(req.params.id)
        res.send(model)
    })
        //----------------------------------------------------------------------------随笔相关
    router.post('/talkothers',auth,async(req,res) => {
        const model = await TalkOther.create(req.body)
        res.send(model)
    })
    router.put('/talkothers/:id',auth,async(req,res) => {
        const model = await TalkOther.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/talkothers/:id',auth,async(req,res) => {
        const model = await TalkOther.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/talkothers',auth,async(req,res) => {
        const items = await TalkOther.find()
        res.send(items)
    })
    router.get('/talkothers/:id',auth,async(req,res) => {
        const model = await TalkOther.findById(req.params.id)
        res.send(model)
    })
       //----------------------------------------------------------------------------收藏相关
       router.post('/collections',auth,async(req,res) => {
        const model = await Collection.create(req.body)
        res.send(model)
    })
    router.put('/collections/:id',auth,async(req,res) => {
        const model = await Collection.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/collections/:id',auth,async(req,res) => {
        const model = await Collection.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/collections',auth,async(req,res) => {
        const items = await Collection.find()
        res.send(items)
    })
    router.get('/collections/:id',auth,async(req,res) => {
        const model = await Collection.findById(req.params.id)
        res.send(model)
    })
    //----------------------------------------------------------------------------留言列表相关
    router.get('/comments',async(req,res)=>{
        const items = await Comment.find()
        res.send(items)
    })
    router.delete('/comments/:id',auth,async(req,res) => {
        const model = await Comment.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    //----------------------------------------------------------------------------管理员相关
    router.post('/admin_users',auth,async(req,res) => {
        const model = await AdminUser.create(req.body)
        res.send(model)
    })
    router.put('/admin_users/:id',auth,async(req,res) => {
        const model = await AdminUser.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/admin_users/:id',auth,async(req,res) => {
        const model = await AdminUser.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/admin_users',auth,async(req,res) => {
        const items = await AdminUser.find()
        res.send(items)
    })
    router.get('/admin_users/:id',auth,async(req,res) => {
        const model = await AdminUser.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api',router)  //将子路由挂载到app实例上


    //存储图片文件的接口
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),auth,async(req,res)=>{
        const file = req.file
        file.url = `http://quyuanming.com/uploads/${file.filename}`
        res.send(file)
    })

    //-------------------------------------------------------------------------------登录路由
    app.post('/admin/api/login', async(req,res)=>{
        const { username,password } = req.body
        //根据用户名找到用户
        const user = await AdminUser.findOne({username}).select('+password')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        assert(user,422,'用户不存在')
        //校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'密码错误')

        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        //返回token
        const token = jwt.sign({ id:user._id },'asfgnklw')
        res.send({token})

    })
    //错误处理函数
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}