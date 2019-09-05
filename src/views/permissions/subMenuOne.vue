<template>
    <div class="subMenuOne">
        <h1>添加一级菜单</h1>
        <div class="content">
            <form class="layui-form" action="">
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
                            <option v-for="(item,index) in viewList" :key='index' :value="item.val">{{item.label}}</option>
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
                        <textarea name='textarea' placeholder="请输入内容" class="layui-textarea"></textarea>
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
                    
                </div>
            </fieldset>
        </div>
    </div>
</template>
<script>
import { viewList } from '@/filter/groupList'
export default {
    data(){
        return{
            info:{},
            viewList:viewList,
            status:false
        }
    },
    mounted(){
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
            .layui-form{
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