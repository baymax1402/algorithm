// 引入
const koa = require('koa');
// 实例化app
const app = new koa();
// 路由的展示
app.use(async ctx => {
    ctx.body = 'Hello World';
})

// 监听
app.listen(3000, ()=> {
    console.log('3000 port listening')
})