

/*
tableId: 表格id
url: 请求路径
headerData表头数据
params：参数
page 是否开启分页
callback  回调函数
*/
export default function (tableId, url, headerData, params, isPage = true, limit = 10, method = "post",callback) {    
    layui.use('table', function () {
        let table = layui.table
        table.render({
            elem: "#" + tableId
            , url: url //数据接口
            , where: params
            , method: method
            , page: isPage  //开启分页 ||pageC
            , cols: headerData
            , dataType: "json"
            , id: tableId
            , limit: limit               
            , done: function(res, curr, count) {
                callback({ res, curr, count })                                                   
            }
        });
    })
   
}

