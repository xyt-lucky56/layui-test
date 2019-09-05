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
          describe: '管理订单信息', 
          version: Random.natural(1, 5)+'.'+Random.natural(1, 9)+'.0', 
          startImgName: '上线', 
          noStartImgName: '下线',
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
const postData1 = req => {  
    let data = [] 
    let count=10
    if(req.url.indexOf('?')!=-1){//获取分页页码
      count=req.url.split('&')[1].split('=')[1]
    }
    
    for (let i = 0; i < count; i++) {
      let count=''
      if(i%2==0){
        count="平台事业部"
      }else{
        count='研发部'
      }
      let post = {
          ID:i+1,
          username:Random.string('lower', 5),
          department: count,          
          name: Random.cname(),
          phone: '13264687646', 
          phoneNumber: '027-2346463', 
          // date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
          email: Random.email(),
          zipcode:Random.zip(), 
          userType:'司机', 
          address:Random.county(true),
          createTime:Random.now(), 
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
const postData2 = req => {  
    let data = [] 
    let count=10
    if(req.url.indexOf('?')!=-1){//获取分页页码
      count=req.url.split('&')[1].split('=')[1]
    }
    
    for (let i = 0; i < count; i++) {      
      let post = {
          ID:i+1,
          username:Random.string('lower', 5),
          department: '平台事业部',          
          name: Random.cname(),
          phone: '13264687646', 
          phoneNumber: '027-2346463', 
          // date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
          email: Random.email(),
          zipcode:Random.zip(), 
          userType:'司机', 
          address:Random.county(true),
          createTime:Random.now(), 
      }  
      data.push(post)
    }
    
    // 返回状态码和文章数据posts
    return {
      code,
      data,
      count:10
    }
  }
const postData3 = req => {  
    let data = [] 
    let count=10
    if(req.url.indexOf('?')!=-1){//获取分页页码
      count=req.url.split('&')[1].split('=')[1]
    }
    
    for (let i = 0; i < count; i++) {      
      let post = {
          ID:i+1,
          username:Random.string('lower', 5),
          department: '研发部',          
          name: Random.cname(),
          phone: '13264687646', 
          phoneNumber: '027-2346463', 
          // date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
          email: Random.email(),
          zipcode:Random.zip(), 
          userType:'司机', 
          address:Random.county(true),
          createTime:Random.now(), 
      }  
      data.push(post)
    }
    
    // 返回状态码和文章数据posts
    return {
      code,
      data,
      count:10
    }
  }

Mock.setup({
    timeout: 500
})


Mock.mock(RegExp("/api/user/myTranferRecord"+".*"), 'get', newsData)
Mock.mock('/api/getForm', 'get', newsData)
Mock.mock(RegExp("/api/user/systemRecord"+".*"), 'get', postData);
Mock.mock(RegExp("/api/user/tableList"+".*"), 'get', postData1);
Mock.mock(RegExp("/api/user/tableInfo"+".*"), 'get', postData2);
Mock.mock(RegExp("/api/user/userInfo"+".*"), 'get', postData3);


