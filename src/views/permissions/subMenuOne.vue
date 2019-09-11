<template>
    <div class="subMenuOne">
        <h1>{{title}}</h1>
        <div class="content">
            <form class="layui-form menuOne" action="" lay-filter="example">
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单名称 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="groupname" lay-verify="required|groupname" autocomplete="off" placeholder="请输入菜单名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">系统名称 :</label>
                    <div class="layui-input-block">
                        <select name="systemname" lay-verify="required">
                            <option value="">请选择系统名称</option>
                            <option v-for="(item,index) in systemnameList" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <!-- <div class="layui-form-item">                
                    <label class="layui-form-label">权限类型 :</label>
                    <div class="layui-input-block">
                        <select name="powerType" lay-verify="required">
                            <option value="">请选择权限类型</option>
                            <option v-for="(item,index) in roleTypes" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div> -->
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片路径 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="picpath" lay-verify="required" autocomplete="off" placeholder="请输入图片路径" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片名称 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="picname" lay-verify="required|picname" autocomplete="off" placeholder="请输入图片名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">是否展开 :</label>
                    <div class="layui-input-block">
                        <select name="systemname" lay-verify="required">
                             <option value="false">否</option>
                             <option value="true">是</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">出现顺序 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="sortno" lay-verify="required|sortno" autocomplete="off" placeholder="请输入出现顺序" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">备注 :</label>
                    <div class="layui-input-block">
                        <textarea name='remark' lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>
                    </div>
                </div>                
                <div class="layui-form-item">
                    <div class="layui-input-block submit">
                        <div>
                            <div class="layui-btn addbtn" lay-submit="" lay-filter="demo1">保存</div>
                            <div class="layui-btn layui-btn-primary addbtn" @click="cancel">取消</div>
                        </div>
                    </div>
                </div>  
            </form>
            <fieldset class="layui-elem-field layui-field-title" v-if='status'>
                <legend>子菜单列表</legend>
                <div class="layui-field-box">  
                    <table class="layui-hide" lay-filter="menuOneTest" id="menuOneTest">
                        <div id="barDemo">
                            <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                            <a class="layui-btn layui-btn-xs bgwarn" lay-event="del">删除</a>
                        </div>
                    </table>
                </div>
            </fieldset>
        </div>
    </div>
</template>
<script>
import { queryGroupinfoById,querySystemInfoNoPage } from '@/api/api'
import { viewList,roleTypes } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
export default {
    data(){
        return{
            title:'添加一级菜单',
            info:{},
            viewList:viewList,
            roleTypes:roleTypes,
            systemnameList:[],
            status:false,
            cols:[[
                {field:'id', title: 'ID',width:80,sort: true},
                {field:'powername', title: '菜单名称',width:150},
                {field:'viewType', title: '界面类型'},
                {field:'powerType', title: '权限类型'},
                {field:'imgName', title: '图片名称'},
                {field:'relativePath', title: '相对文件路径'},
                {field:'relativeFileName', title: '相对文件名称'},
                {field:'menuDisc', title: '菜单描述'},
                {field:'status', title: '操作',toolbar: '#barDemo',width:200,fixed: 'right'},
            ]],
            limit:5,
            id:'',
            form:''
        }
    },
    created(){
        if(JSON.stringify(this.$route.params)!='{}'){
            this.id=this.$route.params.data.id
            this.status=true   
            this.title='菜单编辑'         
        }
    },
    mounted(){
        // if(this.status){
        //     FengunionTable('menuOneTest', '/api/permission/subMentuOne', this.cols, {}, true,this.limit).then(e => {//表格初始化
        //         // console.log(e)
        //     }) 
        // }
        layui.use(['form','table'], ()=>{
            var form = layui.form,
            table=layui.table
            this.form=form
            this.getSubmenuInfo()
            form.render()            
            this.formSubmit(form)
            this.statusChange(table)
            this.checkForm(form)
        })
    },
    methods:{
        getSubmenuInfo(){
            let params={
                id:this.id
            }
            queryGroupinfoById(params).then(res=>{
                console.log(res)
                if(res.code==0){
                    this.info=res.data.sysGroupinfo
                    setTimeout(()=>{
                        this.form.render()
                        this.form.val('example', {
                            'groupname':this.info.groupname,
                            'systemname':this.info.systemname,
                            'picpath':this.info.picpath,
                            'picname':this.info.picname,
                            'isexpand':this.info.isexpand,
                            'sortno':this.info.sortno,
                            'remark':this.info.remark,
                        })
                    })
                }
            })
        },
        formSubmit(form){
            //监听提交
            form.on('submit(demo1)', (data)=>{
                console.log(data.field)
                this.$message.success('提交成功')
                // this.$router.push('/permissions')
                return false
            });
        },
        checkForm(form){
            form.verify({                
                // menuName:[/^[\u2E80-\u9FFF]+$/,'菜单名称不合法'],
                picname:[/[^\s]+\.(jpg|jpeg|gif|png|bmp)/i,'图片名称不合法'],
            })
        },
        statusChange(table){
            table.on('tool(menuOneTest)', (obj)=>{
                var data = obj.data//得到所在行所有键值
                    console.log(data)
                if(obj.event === 'edit'){//编辑
                    this.$router.push({name:'subMenuChild',params:{data}});
                }else if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del();
                        layer.close(index);
                    });
                }
            });
        },
        cancel(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less" scope>
    .subMenuOne{
        // width: 80%;
        text-align: center;
        h1{
            margin-top: 30px;
        }
        .content{
            margin: 20px; 
            .menuOne{
                width: 330px;
                padding-top: 20px;
                margin: 0 auto;
                .layui-form-label{
                    width: 100px;
                }
                .layui-input-block{
                    margin-left: 130px;
                    span{
                        display: inline-block;
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        text-align: left;
                    }
                    .layui-textarea{
                        resize:none;
                    }
                }
                .submit{
                    margin-left: 50px;
                    padding-top: 30px;
                }
            }  
            .layui-elem-field{
                text-align: left;
            }
        }
    }
</style>