<template>
    <div class="user">
        <h1>权限管理</h1>
        <div class="content">
            <div class="content-left left">
                <div class="layui-form">
                    <select name="systemName" lay-verify="" lay-filter="myselect">
                        <option v-for="item in sysnameList" :key="item.val" :value="item.val">{{ item.label }}</option>
                    </select>                 
                </div>
                <div id="classtree" class="demo-tree"></div>
            </div>
            <div class="content-right left">
                <button class="layui-btn addbtn" @click="addMenu">{{showChildTable? '添加子菜单' : '添加一级菜单'}}</button> 
                <table class="layui-hide" lay-filter="test1" id="test1">
                    <div id="barDemo">
                        <a v-show="!showChildTable" class="layui-btn layui-btn-xs" lay-event="jump">添加子菜单</a>
                        <a class="layui-btn layui-btn-xs bgeditor" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-xs bgwarn" lay-event="del">删除</a>
                    </div>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { filterData,isexpands } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
import { sysnameList, filterViewType } from "@/filter/groupList"
import { permissionsMenu,deleteGroupinfo } from "@/api/api"
export default {
    data() {
        return {
            sysnameList,
            tree: null,
            table: null,
            treedata: [{               
                title: '订单管理系统'
                ,id: 1
                ,children:[{
                    title: "订单管理"
                    ,id: 2
                },{
                    title: "订单配送"
                    ,id: 3
                },{
                    title: "订单统计"
                    ,id: 4
                }]
            }],
            cols:[[
                {field:'id', title: '编号', width:150, sort: true},
                {field:'groupname', title: '菜单名称'},
                {field:'systemname', title: '系统名称'},
                {field:'picpath', title: '图片路径',templet:function(res){
                    return filterData(res.picpath)
                }},
                {field:'picname', title: '图片名称',templet:function(res){
                    return filterData(res.picname)
                }},
                {field:'isexpand', title: '是否展开',templet:function(res){
                    return isexpands(res.isexpand)
                }},
                {field:'sortno', title: '出现顺序'},
                {field:'remark', title: '备注'},
                {field:'status', title: '操作',toolbar: '#barDemo',width:210,fixed: 'right'},
            ]],
            limit:10,
            limits:[5,7,10],
            showChildTable: false,
            systemname:''
        }
    },
    mounted() {
        layui.use(['tree', 'table', 'form'], () => {
            layui.form.render();
            layui.form.on('select(myselect)', (data) => {
                // console.log(data);
                this.reloadData(data.value);
            })
            var tree = layui.tree;
            this.showtree(layui.tree);
            this.tree = tree;  
            this.editorBtn(layui.table)
            this.table = layui.table;    
        });
        FengunionTable('test1', 'api/api-a-bkf-/user-mucon/system/queryGroupinfo', this.cols, {systemname:this.systemname}, true,this.limit, 'post', function(e){
            console.log(e)
        })
    },
    methods: {
        showtree(tree) {
            tree.render({
                elem: '#classtree'
                ,id: 'classtree'
                ,data: this.treedata
                ,click: (obj) => {
                    console.log(obj); //得到当前节点元素 
                    this.systemname=obj.data.title
                    $('div.layui-tree-set').each(function() {
                        $(this).removeClass("bgdetail");
                    })  
                    if(!obj.data.children){  
                        obj.elem.addClass("bgdetail");
                    }

                    // console.log(obj.data); //得到当前点击的节点数据
                    let params = {systemname: this.systemname}
                    // console.log(params);
                    this.table.reload('test1', {
                        url: 'api/api-a-bkf-/user-mucon/system/queryGroupinfo'
                        ,where: params //设定异步数据接口的额外参数
                    });

                    if(obj.data.children){
                        this.showChildTable = false;
                    }else{
                        this.showChildTable = true;
                    }
                }
            })
        },
        // 下拉选择后重载数据
        reloadData(val){
            let params = { id: val }

            this.tree.reload('classtree',{
                elem: '#classtree'
                ,data: this.treedata
                ,click: (obj) => {
                    console.log(obj.data); //得到当前点击的节点数据
                    let params = {id: obj.data.id}
                    console.log(params);
                    this.table.reload('test1', {
                        url: '/api/permission/permissionList'
                        ,where: params //设定异步数据接口的额外参数
                    });
                }
            })
            // console.log(this.treedata);
            let param = {id: this.treedata[0].children[0].id }
            console.log(param);
            this.table.reload('test1', {
                url: '/api/permission/permissionList'
                ,where: params //设定异步数据接口的额外参数
            });

        },
        // 监听表格操作按钮  (要想按钮触发此事件，需添加lay-event)
        editorBtn(table) {
            table.on('tool(test1)', (obj) => {
                // console.log(obj)
                var data = obj.data;
                if (obj.event === 'del') {//删除
                    layer.confirm('真的删除行么', (index)=>{
                        let params={
                            id:data.id,
                            count:''
                        }
                        deleteGroupinfo(params).then(res=>{
                            if(res.code==0){
                                this.table.reload('test1', {
                                    url: 'api/api-a-bkf-/user-mucon/system/queryGroupinfo'
                                    ,where: {systemname: this.systemname} //设定异步数据接口的额外参数
                                });
                                layer.close(index);
                            }
                        })
                        // obj.del();
                    })
                } else if (obj.event === 'edit') {//编辑
                    if(this.showChildTable){
                        this.$router.push({name: 'subMenuChild', params: { data }});
                    }else{
                        this.$router.push({name: 'subMenuOne', params: { data }});
                    }
                    
                } else if(obj.event === 'jump') {
                    this.$router.push({ name: 'subMenuChild' })
                }
            });
        },
        addMenu() {
            if(this.showChildTable){
                this.$router.push({ name: 'subMenuChild' });
            }else{
                this.$router.push({name: "subMenuOne"});;
            }            
        }
    }
}
</script>
<style lang="less" scoped>
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
            width: 15%; 
            height: 100%; 
            .layui-form {
                width: 80%;
                margin-bottom: 20px;
            }              
        }
        .content-right{
            width: 80%;
            height: 100%;        
        }
    }
}
</style>