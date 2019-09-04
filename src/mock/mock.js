//-------------------- 自定义接口返回的数据，方便调试-------------------------

const Mock = require('mockjs')
const Random = Mock.Random

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

Mock.setup({
    timeout: 500
})


Mock.mock(RegExp("/api/user/myTranferRecord"+".*"), 'get', newsData)
Mock.mock('/api/getForm', 'get', newsData)
console.log('mock地址',Mock)


