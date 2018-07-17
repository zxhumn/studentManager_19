let express = require('express');
let path = require('path');
let indexRouter = express.Router();
let myT = require(path.join(__dirname,'../tools/myT'));
let objectId = require('mongodb').ObjectID;
// 访问根目录 index
indexRouter.get('/', (req, res) => {
    // 有session 欢迎
    if (req.session.userInfo) {
        let userName = req.session.userInfo.userName;
        // 登陆了
        // 判断用户名
        res.render(path.join(__dirname,"../static/views/index.art"),{
            userName
        });

    } else {
        // 没有session 去登录页
        res.setHeader('content-type', 'text/html');
        res.send("<script>alert('请登录');window.location.href='/login'</script>");
    }
});
// 增
indexRouter.get('/insert',(req,res)=>{
    myT.insert('studentsList',req.query,(err,result)=>{
        if(!err) res.json({
            mess:"新增成功",
            code:200
        })
    })
});
// 删
indexRouter.get('/delete',(req,res)=>{
    let deleteId = req.query.id;
    myT.delete('studentsList',{_id:objectId(deleteId)},(err,result)=>{
        if(!err) res.json({
            mess:"删除成功",
            code:200
        })
    })
})
// 改
indexRouter.get('/update',(req,res)=>{
    let name = req.query.name;
    let age = req.query.age;
    let sex = req.query.sex;
    let address = req.query.address;
    let phone = req.query.phone;
    let introduction = req.query.introduction;
    myT.update('studentsList',{_id:objectId(req.query.id)},{name,age,sex,address,phone,introduction},(err,result)=>{
        if(!err) res.json({
            mess:"修改成功",
            code:200
        })
    })
})
// 查 首页所有
indexRouter.get('/list',(req,res)=>{
    myT.find('studentsList',{},(err,docs)=>{
        if(!err) res.json({
            mess:"数据",
            code:200,
            List:docs
        })
    })
})
// 查用户名
indexRouter.get('/search',(req,res)=>{
    let query = {};
    // 新增查询
    if(req.query.userName){
        query.name = new RegExp(req.query.userName);
    }
    // 编辑查询
    if(req.query.id){
        query._id = objectId(req.query.id);
    }
    myT.find('studentsList',query,(err,docs)=>{
        if(!err) res.json({
            mess:"数据",
            code:200,
            List:docs
        })
    })
})

module.exports = indexRouter;