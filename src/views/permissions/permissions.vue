<template>
    <div class="user">
        <h1>权限管理</h1>
        <div class="content">
            <div class="content-left left">
                <div class="layui-form">
                    <select name="systemName" lay-verify="" lay-filter="myselect">
                        <option value="">请选择系统名称</option>
                        <option v-for="item in sysnameList" :key="item.id" :value="item.val">{{ item.label }}</option>
                    </select>                 
                </div>
                <div id="classtree" class="demo-tree"></div>
            </div>
            <div class="content-right left">
                <div class="demoTable">
                    <form class="layui-form">
                        <div class="layui-form-item layui-inline">
                            <div class="layui-input-block">
                                <div class="layui-btn addbtn" @click="addMenu">{{showChildTable? '添加子菜单' : '添加一级菜单'}}</div> 
                            </div>
                        </div>
                        <div class="right">
                            <div class="layui-form-item layui-inline">
                                <!-- <label class="layui-form-label">订单号：</label> -->
                                <div class="layui-input-inline">
                                    <input class="layui-input" name="waybillId" autocomplete="off" v-model="searchInp">
                                </div>
                            </div>
                            <div class="layui-form-item layui-inline">
                                <div class="layui-input-block">
                                    <div class="layui-btn" @click="search">搜索</div>
                                    <div type="reset" class="layui-btn layui-btn-primary" @click="reset">重置</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
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
import { querySysnameList, queryGroupinfo, permissionsMenu, deleteGroupinfo } from "@/api/api"
export default {
    data() {
        return {
            sysnameList: [],
            tree: null,
            table: null,
            treedata: [],
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
            cols2:[[
                {field:'id', title: '编号', width:150, sort: true},
                {field:'powername', title: '菜单名称'},
                {field:'powertype', title: '权限类型'},
                {field:'relativepath', title: '相对文件路径'},
                {field:'filename', title: '相对文件名称'},
                {field:'formtype', title: '界面类型',templet:function(res){
                    return res.formtype
                }},
                {field:'remark', title: '菜单说明'},
                // {field:'status', title: '操作',toolbar: '#barDemo2',width:210,fixed: 'right'},
            ]],
            limit: 10,
            limits:[5,7,10],
            showChildTable: false,
            systemname:'',
            searchInp:'',
            menuId:''
        }
    },
    created() {
        this.getSystemList();
    },
    methods: {
        // 获取系统列表
        getSystemList() {   
            querySysnameList().then(res=>{
                if(res.code === 0){
                    this.sysnameList = [];
                    res.data.forEach(item => {
                        let obj ={};
                        obj.val = item.systemname;
                        obj.label = item.systemname;
                        obj.id = item.id;
                        this.sysnameList.push(obj);
                    })

                    setTimeout(() => {
                        this.showtree();
                    }, 100)
                                       
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        getTreedata(val) {
            let params = {
                name: val
            }
            permissionsMenu(params).then(res => {
                if(res.code === 0){                            
                    var treedata = [];
                    if(res.data.length>=1){
                        var obj1 = {}, list = res.data[0].list;
                        obj1.id = res.data[0].id;
                        obj1.title = res.data[0].systemname;
                        obj1.children = []; 
                        if(list.length){
                            for(let a = 0; a < list.length; a++){
                                let menutwo = list[a];
                                let obj2 = {};
                                obj2.id = menutwo.groupId;
                                obj2.title = menutwo.groupname;
                                obj1.children.push(obj2);
                            } 
                        }
                        treedata.push(obj1);
                    }
                    
                    console.log(treedata);
                    this.treedata = treedata;
                    this.reloadData(val); 

                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        showtree() {
            layui.use(['tree', 'table', 'form'], () => {
                var tree = layui.tree;
                this.tree = tree;  
                this.editorBtn(layui.table)
                this.table = layui.table;
                layui.form.render();
                layui.tree.render({
                    elem: '#classtree'
                    ,id: 'classtree'
                    ,data: this.treedata
                })
                layui.form.on('select(myselect)', (data) => {
                    // console.log(data.value);
                    if(data.value){
                        this.getTreedata(data.value);
                        this.systemname=data.value
                    } 
                })
                
            });

            var cols = this.cols;
            layui.use('table', function () {
                let table = layui.table
                table.render({
                    elem: "#test1"
                    , method: "post"
                    , page: true  //开启分页 ||pageC
                    , cols: cols
                    , dataType: "json"
                    , id: 'test1'
                    , limit: 10
                    , data: []          
                });
            })
            
        },
        // 下拉选择后重载数据
        reloadData(val){
            let params = {
                systemname: val
            }
            this.tree.reload('classtree',{
                elem: '#classtree'
                ,data: this.treedata
                ,click: (obj) => {
                    this.systemname=obj.data.title
                    $('div.layui-tree-set').each(function() {
                        $(this).removeClass("bgdetail");
                    })  
                    if(!obj.data.children){  
                        obj.elem.addClass("bgdetail");
                    }

                    console.log(obj.data); //得到当前点击的节点数据
                    let data = obj.data;
                    this.menuId=data.id
                    if(data.children){
                        this.showChildTable = false;
                        let param = { systemname: val, searchName: '' }
                        this.table.reload('test1', {
                            url: '/apis/api-a-bkf-/user-mucon/system/queryGroupinfo'
                            ,where: param //设定异步数据接口的额外参数
                            ,cols: this.cols
                        });
                    }else{
                        this.showChildTable = true;
                        let params = {
                            groupId: data.id,
                            searchName: ''
                        }
                        this.table.reload('test1', {
                            url: '/apis/api-a-bkf-/user-mucon/system/queryPowerinfo'
                            ,where: params //设定异步数据接口的额外参数
                            ,cols: this.cols2
                        });
                    }
                    
                }
            })
           
            let param = { systemname: val, searchName: '' }
            this.table.reload('test1', {
                url: '/apis/api-a-bkf-/user-mucon/system/queryGroupinfo'
                ,where: param //设定异步数据接口的额外参数
                ,cols: this.cols
            });

        },
        // 监听表格操作按钮  (要想按钮触发此事件，需添加lay-event)
        editorBtn(table) {
            table.on('tool(test1)', (obj) => {
                // console.log(obj)
                var data = obj.data;
                if (obj.event === 'del') {//删除
                    layer.confirm('删除该菜单，所属的子菜单会一同删除', (index)=>{
                        let params={
                            id:data.id,
                            count:1
                        }
                        deleteGroupinfo(params).then(res=>{
                            if(res.code==0){
                                this.$message.success('删除成功')
                                this.table.reload('test1', {
                                    url: '/apis/api-a-bkf-/user-mucon/system/queryGroupinfo'
                                    ,where: {systemname: this.systemname} //设定异步数据接口的额外参数
                                });
                                layer.close(index);
                            }else{
                                layer.close(index);
                                this.$message.error(res.msg);
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
                    this.$router.push({ name: 'subMenuChild',params:{data,addflag:true} })
                }
            });
        },
        addMenu() {
            if(this.showChildTable){
                this.$router.push({ name: 'subMenuChild' });
            }else{
                this.$router.push({name: "subMenuOne"});;
            }            
        },
        search(){
            if(this.searchInp && this.treedata.length){
                if(this.showChildTable){
                    this.table.reload('test1', {
                        url: '/apis/api-a-bkf-/user-mucon/system/queryPowerinfo'
                        ,where: {
                            groupId:this.menuId,
                            searchName:this.searchInp
                        } //设定异步数据接口的额外参数
                        ,cols: this.cols2
                    });
                }else{
                    this.table.reload('test1', {
                        url: '/apis/api-a-bkf-/user-mucon/system/queryGroupinfo'
                        ,where: {
                            systemname:this.systemname,
                            searchName: this.searchInp
                        } //设定异步数据接口的额外参数
                    });
                }
            }    
        },
        reset(){
            this.searchInp=''
            if(this.showChildTable){
                 this.table.reload('test1', {
                    url: '/apis/api-a-bkf-/user-mucon/system/queryPowerinfo'
                    ,where: {
                        groupId:this.menuId,
                        searchName:this.searchInp
                    } //设定异步数据接口的额外参数
                    ,cols: this.cols2
                });
            }else if(this.systemname){
                this.table.reload('test1', {
                    url: '/apis/api-a-bkf-/user-mucon/system/queryGroupinfo'
                    ,where: {
                        systemname:this.systemname,
                        searchName: this.searchInp
                    } //设定异步数据接口的额外参数
                });
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
            .layui-input-block{
                margin-left: 0;
            }            
        }
    }
}
.tabletest {
    text-align: center;
    width: 100%;
    height: 200px;
}
</style>