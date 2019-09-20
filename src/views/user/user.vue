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
import { filterUserType } from "@/filter/groupList"
import FengunionTable from '@/utils/comTable'//表格封装
import { path, getDeptList, deleteUser } from '@/api/api'
export default {
    data(){
        return{
            depList:[],            
            cols:[[
                {field:'id', title: 'ID',width:80,fixed: 'left'},
                {field:'username', title: '用户名',fixed: 'left'},
                {field:'deptName', title: '所属部门'},
                {field:'systemname', title: '系统名称'},
                {field:'name', title: '姓名'},
                {field:'mobile', title: '手机号'},
                {field:'tel', title: '联系电话'},
                {field:'email', title: '电子邮箱'},
                {field:'postcode', title: '邮政编码'},
                {field:'usertype', title: '用户类型', templet: function (res) {
                    return filterUserType(res.usertype)
                }},
                {field:'address', title: '地址'},
                {field:'createtime', title: '创建时间',width:200},
                {field:'status', title: '操作',toolbar: '#barDemo',width:200,fixed: 'right'},
            ]],
            tree:'',
            limit: 10,
            deptId: ""
        }
    },
    created() {
        this.getDepts()
    },
    mounted(){
        
    },
    methods:{
        // 获取所有部门
        getDepts() {
            getDeptList().then(res => {
                var treedata = [];
                if(res.data.length>=1){
                    var obj1 = {}, list = res.data;
                    obj1.id = "0";
                    obj1.title = "部门";
                    obj1.children = []; 
                    if(list.length){
                        for(let a = 0; a < list.length; a++){
                            let menutwo = list[a];
                            let obj2 = {};
                            obj2.id = menutwo.id;
                            obj2.title = menutwo.deptName;
                            obj1.children.push(obj2);
                        } 
                    }
                    treedata.push(obj1);
                }
                this.depList = treedata;
                setTimeout(() => {
                    this.showtree();
                }, 100)
            })
        },
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
                    layer.confirm('真的删除行么', (index) => {
                        let params={
                            id:data.id,
                        }
                        deleteUser(params).then(res=>{
                            if(res.code==0){
                                this.$message.success('删除成功')
                                var url = path+'/system/findAllUser'
                                var params = {};
                                
                                if(this.deptId !== "0"){
                                    url = path+'/system/findUserByDept';
                                    params = { deptId: this.deptId };
                                }
                                
                                table.reload('test1', {
                                    url: url
                                    ,where: params //设定异步数据接口的额外参数
                                });
                                this.$message.success('删除成功');
                                layer.close(index);
                            }else{
                                layer.close(index);
                                this.$message.error(res.msg);
                            }
                        })
                        // obj.del();
                        layer.close(index);
                    });
                }else if(obj.event === 'jump'){
                    console.log(data);
                    this.$router.push({ name: 'roleassignment', params: { id: data.id, systemname: data.systemname }})                   
                }
            })
        },
        showtree() {
            var that = this;
            FengunionTable('test1', path + '/system/findAllUser', this.cols, {}, true,this.limit,'post',function(e){
                // console.log(e)
            })
            
            layui.use(['tree','table'], ()=>{
                var tree = layui.tree
                ,table=layui.table
                this.tree=tree
                tree.render({
                    elem: '#test',
                    data: this.depList,
                    accordion: true,//手风琴模式                
                    click: (obj) => {
                        $('div.layui-tree-set').each(function() {
                            $(this).removeClass("bgdetail");
                        })  
                        if(!obj.data.children){  
                            obj.elem.addClass("bgdetail");
                        }

                        let data = obj.data;  //获取当前点击的节点数据
                        // console.log(data);
                        that.deptId = data.id;
                        // console.log(that.deptId);
                        if(that.deptId !== "0"){
                            let params = { deptId: data.id};
                            table.reload('test1', {
                                url: path+'/system/findUserByDept'
                                ,where: params 
                            });
                        }                    
                    }
                })            
                this.statusChange(table)
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