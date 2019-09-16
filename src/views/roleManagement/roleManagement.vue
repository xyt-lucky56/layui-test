<template>
    <div class="role">
        <h1>角色管理</h1>
        <div class="content">
            <div class="add-box">            
                <button class="layui-btn addbtn" @click="add">添加角色</button>
            </div> 
            <table class="layui-hide" lay-filter="tableRole" id="tableRole">
                <div id="barDemo">
                    <a class="layui-btn layui-btn-xs bgdefault" lay-event="assign">权限分配</a>
                    <a class="layui-btn layui-btn-xs bgeditor" lay-event="edit">编辑</a>
                    <a class="layui-btn layui-btn-xs bgdetail" lay-event="detail">详情</a>
                    <a class="layui-btn layui-btn-xs bgwarn" lay-event="del">删除</a>
                </div>
            </table>
           
        </div>       
    </div>
</template>
<script>
import FengunionTable from '@/utils/comTable'  //表格封装
import { filterSysName } from "@/filter/groupList"
import { path,QUERYROLELIST, roleDelete } from '@/api/api'
export default {
    data(){
        return{
            cols:[[
                {field:'id', title: '编号', width:150, sort: true},
                {field:'rolename', title: '角色名称'},
                {field:'systemname', title: '系统名称', },
                {field:'remark', title: '备注'},
                {field:'status', title: '操作',toolbar: '#barDemo',width:260,fixed: 'right'},
            ]],
            limit:10,
            limits:[5,7,10],
            data:[]
        }
    },
    mounted(){
        let url = path + QUERYROLELIST;
        // console.log(url)
        FengunionTable('tableRole', url, this.cols, {}, true,this.limit, 'post', function(e) {//表格初始化
            // console.log(e)
        }) 
        layui.use(['table'], () => {
            this.editorBtn(layui.table)
        }) 
    },
    methods:{
        // 监听表格操作按钮  (要想按钮触发此事件，需添加lay-event)
        editorBtn(table) {
            table.on('tool(tableRole)', (obj) => {
                
                var data = obj.data;
                if (obj.event === 'detail') {                   
                    this.$router.push({name: 'subrole', params: { type: 'detail', data }});
                } else if (obj.event === 'del') {
                    this.$message.confirm('真的删除行么').then(() => {                        
                        let params={
                            id:data.id
                        }
                        roleDelete(params).then(res=>{
                            console.log(res)
                            if(res.code==0){
                                let url = path + QUERYROLELIST
                                table.reload('tableRole', {
                                    url: url
                                });
                               
                            }
                        })
                    })
                } else if (obj.event === 'edit') { 
                    this.$router.push({name: 'subrole', params: { type: 'edit', data }});
                } else if(obj.event === 'assign') {
                    this.$router.push({ name: 'rolePower', params: { id: data.id } })
                }
            });
        },
        add(){
            this.$router.push({name: 'subrole'});
        }
    }
}
</script>
<style lang="less" scoped>
.role {
    h1 {
        margin-top: 30px; 
    }
    .content {
        .add-box {
            text-align: left;
            padding: 10px 0;
        }
    }
}
</style>