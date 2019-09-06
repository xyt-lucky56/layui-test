<template>
    <div class="subMenuOne">
        <h1>添加一级菜单</h1>
        <div class="content">
            <form class="layui-form menuOne" action="">
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单名称 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="menu" :readonly="status" lay-verify="required" autocomplete="off" placeholder="请输入菜单名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">界面类型 :</label>
                    <div class="layui-input-block">
                        <select name="InterfaceType" lay-verify="required" v-model="info.InterfaceType">
                            <option v-for="(item,index) in viewList" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">权限类型 :</label>
                    <div class="layui-input-block">
                        <select name="roleType" lay-verify="required" v-model="info.roleType">
                            <option v-for="(item,index) in roleTypes" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片名称 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="imgName" :readonly="status" lay-verify="required" autocomplete="off" placeholder="请输入图片名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">相对文件名称 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="relativeDoc" :readonly="status" lay-verify="required" autocomplete="off" placeholder="请输入相对文件名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单描述 :</label>
                    <div class="layui-input-block">
                        <textarea name='menuDescription' placeholder="请输入内容" class="layui-textarea"></textarea>
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
            <fieldset class="layui-elem-field layui-field-title">
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
import { viewList,roleTypes } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
export default {
    data(){
        return{
            info:{},
            viewList:viewList,
            roleTypes:roleTypes,
            status:false,
            cols:[[
                {field:'ID', title: 'ID',width:80,sort: true},
                {field:'menuName', title: '菜单名称',width:150},
                {field:'viewType', title: '界面类型'},
                {field:'powerType', title: '权限类型'},
                {field:'imgName', title: '图片名称'},
                {field:'relativePath', title: '相对文件路径'},
                {field:'relativeFileName', title: '相对文件名称'},
                {field:'menuDisc', title: '菜单描述'},
                {field:'status', title: '操作',toolbar: '#barDemo',width:200,fixed: 'right'},
            ]],
            limit:5
        }
    },
    mounted(){
        FengunionTable('menuOneTest', '/api/permission/subMentuOne', this.cols, {}, true,this.limit).then(e => {//表格初始化
            // console.log(e)
        }) 
        layui.use(['form'], ()=>{
            var form = layui.form
            form.render()
        })
    },
    methods:{
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