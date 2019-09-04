<template>
    <div class="user">
        <h1>用户管理</h1>
        <div class="content">
            <div class="content-left left">
                <div id="test" class="demo-tree"></div>
            </div>
            <div class="content-right left">
                <button class="layui-btn addbtn">添加用户</button> 
                <table class="layui-hide" lay-filter="test1" id="test1">
                    <div id="barDemo">
                        <a class="layui-btn layui-btn-xs bgeditor" lay-event="jump">角色分配</a>
                        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-xs bgwarn" lay-event="del">删除</a>
                    </div>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import FengunionTable from '@/utils/comTable'//表格封装
export default {
    data(){
        return{
            data:[
                {title: '部门',id:1,spread:true,children:[
                    {title: '平台事业部',id:11},
                    {title: '研发部',id:12},
                    {title: '财务部',id:13},
                    {title: '人事部',id:14},
                ]}
            ],
            cols:[[
                {field:'ID', title: 'ID',width:80,sort: true,fixed: 'left'},
                {field:'username', title: '用户名'},
                {field:'department', title: '所属部门'},
                {field:'name', title: '姓名'},
                {field:'phone', title: '手机号'},
                {field:'phoneNumber', title: '联系电话'},
                {field:'email', title: '电子邮箱'},
                {field:'zipcode', title: '邮政编码'},
                {field:'userType', title: '用户类型'},
                {field:'address', title: '地址'},
                {field:'createTime', title: '创建时间',width:200},
                {field:'status', title: '操作',toolbar: '#barDemo',width:200,fixed: 'right'},
            ]]
        }
    },
    mounted(){
        FengunionTable('test1', '/api/user/tableList', this.cols, {}, true).then(e => {//表格初始化
            // console.log(e)
        })    
        layui.use(['tree', 'util'], ()=>{
            var tree = layui.tree
            ,util = layui.util
            tree.render({
                elem: '#test',
                data:this.data,
                accordion: true,//手风琴模式                
                click: function(obj){
                    var data = obj.data;  //获取当前点击的节点数据
                    console.log(data)
                    // layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
                }
            })
        })
    },
    methods:{

    }
}
</script>
<style lang="less" scope>
    .user{
        // text-align: center;
        .content{
            width: 100%;
            overflow: hidden;
            .content-left{
                width: 10%; 
                height: 100%;               
            }
            .content-right{
                width: 80%;
                height: 100%;        
            }
        }
    }
</style>