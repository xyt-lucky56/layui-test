<template>
    <div class="subMenuOne">
        <h1>{{ title }}</h1>
        <div class="content">
            <form class="layui-form menuOne" action="" lay-filter="formMenuChild">
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="menuName" lay-verify="required" autocomplete="off" placeholder="请输入菜单名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">界面类型：</label>
                    <div class="layui-input-block">
                        <select name="viewType" lay-verify="required" v-model="info.InterfaceType">
                            <option v-for="(item,index) in viewList" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">权限类型：</label>
                    <div class="layui-input-block">
                        <select name="powerType" lay-verify="required" v-model="info.roleType">
                            <option v-for="(item,index) in roleTypes" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">相对文件路径：</label>
                    <div class="layui-input-block">
                        <input type="text" name="relativePath" lay-verify="required" autocomplete="off" placeholder="请输入相对文件名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="imgName" lay-verify="required" autocomplete="off" placeholder="请输入图片名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">相对文件名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="relativeFileName" lay-verify="required" autocomplete="off" placeholder="请输入相对文件路径" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单描述：</label>
                    <div class="layui-input-block">
                        <textarea name='menuDisc' placeholder="请输入内容" class="layui-textarea"></textarea>
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
        </div>
    </div>
</template>
<script>
import { viewList,roleTypes } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
export default {
    data(){
        return{
            title: "添加子菜单",
            info:{},
            viewList:viewList,
            roleTypes:roleTypes,
            menudata: null,    
        }
    },
    created() {
        console.log(this.$route.params);
        if(this.$route.params.data){    
            this.menudata = this.$route.params.data;
            this.title = "编辑子菜单";
        }
    },
    mounted(){
        layui.use(['form'], ()=>{
            var form = layui.form
            form.render()
            if(this.menudata){     // 设置初始值
                this.setVal(form);
            }
        })
    },
    methods:{
        // 编辑或者查看设置初始值
        setVal(form){
            form.val("formMenuChild", {
                "menuName": this.menudata.menuName
                ,"powerType": this.menudata.powerType
                ,"relativePath": this.menudata.relativePath
                ,"imgName": this.menudata.imgName
                ,"relativeFileName": this.menudata.relativeFileName
                ,"viewType": this.menudata.viewType
                ,"menuDisc": this.menudata.menuDisc
            })
        },
        cancel(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less" scope>
    .subMenuOne{
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
            
        }
    }
</style>