//-------------------- 自定义接口返回的数据，方便调试-------------------------

const Mock = require('mockjs')
const Random = Mock.Random
const code = 0 // 返回的状态码

const newsData = function () {
    let articles = []
    for (let i = 0; i < 10; i++) {
        let newsObj = {
            date: Random.date(),  //年月日
            longDate: Random.datetime(), //精确到时分秒
            number: Random.natural(201, 205),  //数字
            image: Random.image(),      //图片
            flag: Random.boolean(),  // true-false
            name: Random.cname(),     //姓名
            url: Random.url(),       //url地址
            word: Random.word(5),
            province: Random.province(),  //省
            city: Random.city(),     //市
            county: Random.county()  //区
        }
        articles.push(newsObj)
    }

    return {
        code: 0,
        msg: "操作成功",
        data: articles,
        count:20
    }

}

// 随机生成文章数据
const postData = req => {  
    // console.log(req) // 请求体，用于获取参数
    let data = [] // 用于存放文章数据的数组
    let count=10
    if(req.url.indexOf('?')!=-1){//获取分页页码
      count=req.url.split('&')[1].split('=')[1]
    }
    
    for (let i = 0; i < count; i++) {
      let post = {
          ID:i+1,
          name:'订单管理',
          describe: '管理订单信息', // 随机生成长度为10-25的标题
          version: '1.0.0', // 随机生成大小为250x250的图片链接
          startImgName: '上线', // 随机生成大小为250x250的图片链接
          noStartImgName: '下线', // 随机生成名字
          // date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
          imgPath: Random.url(),
          order:Random.natural(0, 20), 
          startPage:'index'+i+'.heml', 
          note:'无', 
      }
  
      data.push(post)
    }
    
    // 返回状态码和文章数据posts
    return {
      code,
      data,
      count:20
    }
  }

Mock.setup({
    timeout: 500
})


Mock.mock(RegExp("/api/user/myTranferRecord"+".*"), 'get', newsData)
Mock.mock('/api/getForm', 'get', newsData)
Mock.mock(RegExp("/api/user/systemRecord"+".*"), 'get', postData);


