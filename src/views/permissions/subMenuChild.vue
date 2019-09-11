<template>
    <div class="subMenuOne">
        <h1>{{ title }}</h1>
        <div class="content">
            <form class="layui-form menuOne" action="" lay-filter="formMenuChild">
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="powername" lay-verify="required" autocomplete="off" placeholder="请输入菜单名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">界面类型：</label>
                    <div class="layui-input-block">
                        <select name="formtype" lay-verify="required" v-model="info.InterfaceType">
                            <option value="">请选择界面类型</option>
                            <option v-for="(item,index) in viewList" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">权限类型：</label>
                    <div class="layui-input-block">
                        <select name="powertype" lay-verify="required" v-model="info.roleType">
                            <option value="">请选择权限类型</option>
                            <option v-for="(item,index) in roleTypes" :key='index' :value="item.val">{{item.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">相对文件路径：</label>
                    <div class="layui-input-block">
                        <input type="text" name="relativepath" lay-verify="required" autocomplete="off" placeholder="请输入相对文件名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">文件名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="filename" lay-verify="required" autocomplete="off" placeholder="请输入相对文件路径" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片相对路径：</label>
                    <div class="layui-input-block">
                        <input type="text" name="picrelativepath" lay-verify="required" autocomplete="off" placeholder="请输入相对文件名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="picname" lay-verify="required" autocomplete="off" placeholder="请输入图片名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">菜单描述：</label>
                    <div class="layui-input-block">
                        <textarea name='remark' placeholder="请输入内容" class="layui-textarea"></textarea>
                    </div>
                </div>    
                <div class="layui-form-item" v-if="status">                
                    <label class="layui-form-label">是否停用：</label>
                    <div class="layui-input-block">
                        <select name="stopsign" lay-verify="required">
                            <option value="">请选择是否停用</option>
                            <option value="true">停用</option>
                            <option value="false">不停用</option>
                        </select>
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
import { queryPowerinfoById,addPowerinfo } from '@/api/api'
import { viewList,roleTypes } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
export default {
    data(){
        return{
            title: "添加子菜单",
            info:{},
            viewList:viewList,
            roleTypes:roleTypes,
            menudata: {},  
            status:false,
            id:''
        }
    },
    created() {
        // console.log(this.$route.params);
        if(this.$route.params.data){    
            this.id = this.$route.params.data.id;
            this.title = "编辑子菜单";
            this.status=true
        }
    },
    mounted(){
        layui.use(['form'], ()=>{
            var form = layui.form
            form.render()
            this.formSubmit(form)
            // if(this.menudata){     // 设置初始值
            //     this.setVal(form);
            // }
        })
    },
    methods:{        
        // 编辑或者查看设置初始值
        setVal(form){
            form.val("formMenuChild", {
                "powername": this.menudata.powername
                ,"formtype": this.menudata.formtype
                ,"powertype": this.menudata.powertype
                ,"relativepath": this.menudata.relativepath
                ,"filename": this.menudata.filename
                ,"picrelativepath": this.menudata.picrelativepath
                ,"picname": this.menudata.picname
                ,"remark": this.menudata.remark
            })
        },
        formSubmit(form){
            form.on('submit(demo1)', (data)=>{
                console.log(data.field)
                let params={
                    powername:data.field.powername,
                    powercontent:data.field.powercontent,
                    powertype:data.field.powertype,
                    paramstr:data.field.paramstr,
                    relativepath:data.field.relativepath,
                    filename:data.field.filename,
                    picrelativepath:data.field.picrelativepath,
                    picname:data.field.picname,
                    formtype:data.field.formtype,
                    stopsign:data.field.stopsign,
                    remark:data.field.remark,
                }
                addPowerinfo(params).then(res=>{
                    console.log(res)
                    if(res.code==0){
                        this.$message.success('提交成功')
                        this.$router.push('/admin/permissions')
                        return false
                    }
                })
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