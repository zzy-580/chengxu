//引入Express模块
const express = require('express');

//引入CORS模块

const cors = require('cors');

//引入MySQL模块

const mysql = require('mysql');


//引入body-parser

const bodyParser=require('body-parser')

//创建MySQL连接池
const pool = mysql.createPool({
    //数据库服务器地址
    host:'127.0.0.1',
    //数据库用户名
    user:'root',
    //数据库用户密码
    password:'',
    //数据库服务器端口号
    port:3306,
    //数据库名称
    database:'xzqa',
    //编码方式
    charset:'utf8',
    //连接限制
    connectionLimit:15
});

//创建Express实例
const server = express();

//将CORS作为Server的中间件使用
server.use(cors({
  origin:['http://127.0.0.1:8080','http://localhost:8080','http://192.168.13.49:8080']
}));

//讲body-parder作为Server的中间件使用
server.use(bodyParser.urlencoded({
  extended:false
}))

//获取所有文章分类信息的API
server.get('/category',(req,res)=>{
    //SQL查询语句
    let sql = 'SELECT id,category_name FROM xzqa_category';
    //执行SQL查询语句
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        //响应到客户端的信息
        res.send({message:'查询成功',code:1,results:results});
    });
});

//获取特定分类下的文章数据
server.get('/articles',(req,res)=>{
    //获取客户端URL地址栏的参数
    let cid = req.query.cid;
    //获取当前的页码
    let page = req.query.page;
    //声明变量用于存储每页显示的记录数
    let pagesize = 20;
    //分页实质上利用了SELECT语句的LIMIT子句
    //其标准计算公式为 (页码-1) * 每页显示记录数
    //所以现在必须通过上述公式计算出 offset参数值    
    let offset = (page-1) * pagesize;
    //获取总记录数的操作        
    let sql = 'SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?';
    pool.query(sql,[cid],(err,result)=>{
        if(err) throw err;
        //获取出总记录数
        //因为聚合函数只有一个返回结果,所以result[0]将返回该结果
        //而结果是一个对象,包含有count的属性(count属性实质是SQL语名中字段的别名)
        let rowCount = result[0].count;
       
        //声明变量pagecount用于存储计算出来总页数
        let pagecount = Math.ceil(rowCount / pagesize);
        //以获取到的参数为条件在文章数据表中进行查找操作    
        sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id = ? LIMIT ' + offset + ',' + pagesize;
        pool.query(sql,[cid],(err,results)=>{
            if(err) throw err;
            res.send({message:'查询成功',code:1,articles:results,pagecount:pagecount});
        });

    });
   
});


// 获取指定文章详细信息的接口
server.get('/view',(req,res)=>{
    //获取地址栏中的id参数
    let id = req.query.id;
    //以id为条件进行文章相关信息的查找操作(一会儿还要进行调整)
    let sql = 'SELECT a.id,subject,content,nickname,avatar,article_number,created_at FROM xzqa_article AS a INNER JOIN xzqa_author AS u ON author_id = u.id WHERE a.id=?';
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
        res.send({message:'查询成功',code:1,results:results[0]});
    });
});

//用户注册接口
server.post('/register',(req,res)=>{
  let username=req.body.username;
  let sql='SELECT COUNT(id) AS count from xzqa_author WHERE username=?';
  pool.query(sql,[username],(err,results)=>{
    if(err) throw err;
    if(results[0].count){
      res.send({message:'注册失败',code:0});
    }else{
      let password=req.body.password;
      let sql='INSERT INTO xzqa_author(username,password) VALUES(?,MD5(?))';
      pool.query(sql,[username,password],(err,results)=>{
        if(err) throw err;
        res.send({message:'注册成功',code:1})
      })
    }
  })
})

//用户登陆接口
server.post('/login',(req,res)=>{
  let username=req.body.username;
  let password=req.body.password;
  let sql='SELECT id,username,nickname FROM xzqa_author WHERE username=? AND password=MD5(?)';
  pool.query(sql,[username,password],(err,results)=>{
    if(err) throw err;
    if(results.length==1){
      res.send({message:'登陆成功',code:1})
    }else{
      res.send({message:'登陆失败',code:0})
    }
  })
})
//指定服务器的监听端口号
server.listen(3000);