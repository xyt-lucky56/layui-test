<template>
    <div class="subsystem">
        <h1>{{ title }}</h1>
        <div class="content">
            <form class="layui-form" action="" lay-filter="formTest">
                <div class="layui-form-item">                
                    <label class="layui-form-label">角色名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="rolename" lay-verify="required" autocomplete="off" placeholder="请输入角色名称" lay-verType='tips' class="layui-input inp titleInp" :readonly="isreadonly">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">系统名称：</label>
                    <div class="layui-input-block">
                        <select v-if="!isreadonly" name="systemname" lay-verify="required">
                            <option value="">请选择系统名称</option>
                            <option v-for="item in sysnameList" :key="item.id" :value="item.val">{{ item.label }}</option>
                        </select>
                        <input v-if="isreadonly" type="text" name="systemname" autocomplete="off" class="layui-input inp titleInp" :readonly="isreadonly">                
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">备注：</label>
                    <div class="layui-input-block">
                        <textarea name="remark" placeholder="请输入内容" class="layui-textarea" :readonly="isreadonly"></textarea>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div v-if="!isreadonly" class="layui-input-block submit">
                        <div class="layui-btn addbtn" lay-submit="" lay-filter="subrole">确定</div>
                        <div class="layui-btn layui-btn-primary addbtn" @click="goback">取消</div>
                    </div>
                    <div v-else class="layui-input-block submit">                       
                        <div class="layui-btn layui-btn-primary addbtn" @click="goback">返回</div>
                    </div>
                    
                </div>                
            </form>
        </div>
    </div>
</template>
<script>
import { sysnameList } from "@/filter/groupList"
import { querySysnameList, addRole, roleEdit } from '@/api/api'
export default {
    data(){
        return{
            title: "添加角色",
            sysnameList: null,
            roledata: {},  // c初始值
            isreadonly: false,   // 详情页只读
            form:''
        }
    },
    created() {
        if(this.$route.params.data){
            // console.log(this.$route.params);
            this.roledata = this.$route.params.data;
            this.title = "编辑角色";
            if(this.$route.params.type === 'detail'){
                this.isreadonly = true;
                this.title = "角色详情";                
            }
        }
        
    },
    mounted(){
        layui.use(['form'], ()=>{
            var form = layui.form
            this.form=form                 
            this.initForm(form);    
            this.getSystemList();        
        })      
    },
    updated(){
        layui.use(['form'], ()=>{
            var form = layui.form;
            form.render();  
            console.log(this.roledata); 
            form.val("formTest", {  // 设置初始值
                "rolename": this.roledata.rolename
                , "systemname": this.roledata.systemname
                , "remark": this.roledata.remark
            })           
        })
    },
    methods:{
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
                    // console.log(this.sysnameList);
                    
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        initForm(form){
            form.render();
            this.formSubmit(form);
            console.log(this.roledata);
            form.val("formTest", {
                "rolename": this.roledata.rolename
                , "systemname": this.roledata.systemname
                , "remark": this.roledata.remark
            })
                     
                        
        },
        formSubmit(form){
            //监听提交
            form.on('submit(subrole)', function(data){
                if(this.roledata){
                    let params = {
                        id: this.roledata.id,
                        rolename: data.rolename,
                        systemname: data.systemname,
                        remark: data.remark
                    }
                    roleEdit(params).then(res => {
                        if(res.code === 0){
                            
                            this.$message.success('角色编辑成功');
                            
                        }else{
                            this.$message.warning(res.msg);
                        }
                    })
                }

                // layer.alert('提交成功', {
                //     title: '最终的提交信息'
                // })
                // return false;
            });
        },        
        goback(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less" scope>
    .subsystem{
        width: 80%;
        text-align: center;
        h1{
            margin-top: 50px;
        }
        .content{
            margin: 20px; 
            .layui-form{
                // width: 25%;
                width: 330px;
                padding-top: 20px;
                margin: 0 auto;
                .submit{
                    margin-left: 50px;
                    padding-top: 30px;
                }
            }        
        }
    }
</style>