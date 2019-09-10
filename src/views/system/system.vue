<template>
    <div class="system">
        <h1>系统管理</h1>
        <div class="content">            
            <button class="layui-btn addbtn" @click="add">添加子系统</button> 
            <!-- <button class="layui-btn layui-btn-sm" @click="submit1">按钮一</button> 
            <button class="layui-btn layui-btn-sm layui-btn-primary" @click="submit1">按钮一</button> 
            <button class="layui-btn layui-btn-xs" @click="submit1">按钮一</button> 
            <button class="layui-btn layui-btn-xs bg1" @click="submit1">按钮一</button> 
            <button class="layui-btn layui-btn-xs bg2" @click="submit1">按钮一</button> 
            <button class="layui-btn layui-btn-xs bg3" @click="submit1">按钮一</button>  -->
            <table class="layui-hide" lay-filter="test" id="test">
                <div id="barDemo">
                    <a class="layui-btn layui-btn-xs bgeditor" lay-event="edit">编辑</a>
                    <a class="layui-btn layui-btn-xs bgdetail" lay-event="detail">详情</a>
                    <a class="layui-btn layui-btn-xs bgwarn" lay-event="del">删除</a>
                </div>
            </table>
        </div>
    </div>
</template>
<script>
import { filterData } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
import { delSubsystem } from '@/api/api'
export default {
    data(){
        return{
            cols:[[
                {field:'id', title: 'ID',width:80,sort: true,fixed: 'left'},
                {field:'systemname', title: '系统名称',width:150,fixed: 'left',templet:function(res){
                    return filterData(res.systemname)
                }},
                {field:'systemcontent', title: '系统描述',templet:function(res){
                    return filterData(res.systemcontent)
                }},
                {field:'versionno', title: '系统版本号',templet:function(res){
                    return filterData(res.versionno)
                }},
                {field:'enabledpicname', title: '启动图片名称',templet:function(res){
                    return filterData(res.enabledpicname)
                }},
                {field:'disabledpicname', title: '不启动图片名称',templet:function(res){
                    return filterData(res.disabledpicname)
                }},
                {field:'picurl', title: '图片路径',templet:function(res){
                    return filterData(res.picurl)
                }},
                {field:'sortno', title: '展示顺序',templet:function(res){
                    return filterData(res.sortno)
                }},
                {field:'initpage', title: '起始页面',templet:function(res){
                    return filterData(res.initpage)
                }},
                {field:'remark', title: '备注',templet:function(res){
                    return filterData(res.remark)
                }},
                {field:'status', title: '操作',toolbar: '#barDemo',width:200,fixed: 'right'},
            ]],
            limit:10,
            limits:[5,7,10],
        }
    },
    mounted(){
        FengunionTable('test', 'api/api-a-bkf-/user-mucon/system/querySystemInfo', this.cols, {}, true,this.limit).then(e => {//表格初始化
            console.log(e)
        })    
        layui.use(['table'], ()=>{
            var table=layui.table
            this.statusChange(table)
        })     
    },
    methods:{
        add(){
            this.$router.push('/admin/subsystem');
        },
        statusChange(table){
            //监听行工具事件
            table.on('tool(test)', (obj)=>{
                var data = obj.data//得到所在行所有键值
                    // console.log(data)
                if(obj.event === 'detail'){
                    // layer.msg('ID：'+ data.ID + ' 的查看操作');
                    this.$router.push({name:'subsystem',params:{data}});
                }else if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        // console.log(data)
                        let params={
                            id:data.id
                        }
                        delSubsystem(params).then(res=>{
                            console.log(res)
                        })
                        // obj.del();
                        // layer.close(index);
                    });
                } else if(obj.event === 'edit'){
                    this.$router.push({name:'subsystem',params:{data,flag:true}});
                }
            });
        }
    }
}
</script>
<style lang="less" scope>
    .system{   
        text-align: center;  
        h1{
            margin-top: 30px;
        }
        .content{
            margin: 20px;
            text-align: left;
            .addbtn{
                margin: 10px 0;
            }                    
        }
    }
</style>