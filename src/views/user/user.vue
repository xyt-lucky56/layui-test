<template>
    <div class="user">
        <h1>用户管理</h1>
        <div class="content">
            <div class="content-left left">
                <div id="test" class="demo-tree"></div>
            </div>
            <div class="content-right left">
                <button class="layui-btn addbtn" @click="add">添加用户</button> 
                <table class="layui-hide" lay-filter="test1" id="test1">
                    <div id="barDemo">
                        <a class="layui-btn layui-btn-xs" lay-event="jump">角色分配</a>
                        <a class="layui-btn layui-btn-xs bgeditor" lay-event="edit">编辑</a>
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
                {field:'username', title: '用户名',fixed: 'left'},
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
            ]],
            tree:'',
        }
    },
    mounted(){
        FengunionTable('test1', '/api/user/tableList', this.cols, {}, true).then(e => {//表格初始化
            // console.log(e)
        })    
        layui.use(['tree','table'], ()=>{
            var tree = layui.tree
            ,table=layui.table
            this.tree=tree
            tree.render({
                elem: '#test',
                data:this.data,
                accordion: true,//手风琴模式                
                click: function(obj){
                    let data = obj.data;  //获取当前点击的节点数据
                    console.log(data)                    
                    if(data.title=='平台事业部'){
                        table.reload('test1', {
                            url: '/api/user/tableInfo'
                            ,where: {} //设定异步数据接口的额外参数
                            //,height: 300
                        });
                    }else if(data.title=='研发部'){
                        table.reload('test1', {
                            url: '/api/user/userInfo'
                        });
                    }else if(data.title=='部门'){
                        table.reload('test1', {
                            url: '/api/user/tableList'
                        });
                    }
                }
            })            
            this.statusChange(table)
        })
    },
    methods:{
        add(){
             this.$router.push('/admin/adduser');
        },
        statusChange(table){
            //监听行工具事件
            table.on('tool(test1)', (obj)=>{
                var data = obj.data
                if(obj.event === 'edit'){
                    this.$router.push({name:'adduser',params:{data}});
                }else if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del();
                        layer.close(index);
                    });
                }else if(obj.event === 'jump'){
                    this.$router.push('/admin/roleassignment')                   
                }
            })
        }
    }
}
</script>
<style lang="less" scope>
    .user{
        text-align: center;
        h1{
            margin-top: 30px;
        }
        .content{
            width: 100%;
            text-align: left;
            overflow: hidden;
            .content-left{
                width: 10%; 
                height: 100%;
                // .layui-icon-file{//树形组件图标隐藏
                //     display: none;
                // }               
            }
            .content-right{
                width:85%;
                height: 100%;        
            }
        }
    }
</style>