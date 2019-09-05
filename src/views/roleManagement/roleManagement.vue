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
            <!-- <script type="text/html" id="titleTpl">
                <span>{{ d.systemName | filterSysName }}</span>
            </script> -->
        </div>       
    </div>
</template>
<script>
import FengunionTable from '@/utils/comTable'  //表格封装
import { filterSysName } from "@/filter/groupList"
export default {
    data(){
        return{
            cols:[[
                {field:'ID', title: '编号', width:150, sort: true},
                {field:'name', title: '角色名称'},
                {field:'systemName', title: '系统名称', },
                // {field:'version', title: '系统版本号'},
                // {field:'startImgName', title: '启动图片名称'},
                // {field:'noStartImgName', title: '不启动图片名称'},
                // {field:'imgPath', title: '图片路径'},
                // {field:'order', title: '展示顺序'},
                // {field:'startPage', title: '起始页面'},
                {field:'note', title: '备注'},
                {field:'status', title: '操作',toolbar: '#barDemo',width:260,fixed: 'right'},
            ]],
            limit:10,
            limits:[5,7,10],
            data:[]
        }
    },
    mounted(){       
        FengunionTable('tableRole', '/api/info/myTranferRecord', this.cols, {}, true,this.limit, 'get', filterSysName).then(e => {//表格初始化
            console.log(e)
        }) 
        layui.use(['table'], () => {
            this.editorBtn(layui.table)
        }) 
    },
    methods:{
        // 监听表格操作按钮  (要想按钮触发此事件，需添加lay-event)
        editorBtn(table) {
            table.on('tool(tableRole)', (obj) => {
                console.log(obj)
                var data = obj.data;
                if (obj.event === 'detail') {
                    // this.$message.success('恭喜您，打开成功')
                    this.$router.push({name: 'subrole', query: { type: 'detail', data }});
                } else if (obj.event === 'del') {
                    this.$message.confirm('真的删除行么').then(() => {
                        obj.del();
                    })
                } else if (obj.event === 'edit') {
                    // layer.alert('编辑行：<br>' + JSON.stringify(data))
                    this.$router.push({name: 'subrole', query: { type: 'edit', data }});
                } else if(obj.event === 'assign') {
                    this.$router.push({ name: 'rolePower' })
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