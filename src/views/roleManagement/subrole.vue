<template>
    <div class="subsystem">
        <h1>添加角色</h1>
        <div class="content">
            <form class="layui-form" action="" lay-filter="formTest">
                <div class="layui-form-item">                
                    <label class="layui-form-label">角色名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入角色名称" lay-verType='tips' class="layui-input inp titleInp" :readonly="isreadonly">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">系统名称：</label>
                    <div class="layui-input-block">
                        <select name="systemName" lay-verify="required">
                            <option v-if="!isreadonly" value="" >请选择系统名称</option>
                            <option v-for="item in sysnameList" :key="item.val" :value="item.val" :disabled="isreadonly">{{ item.label }}</option>
                        </select>                 
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">备注：</label>
                    <div class="layui-input-block">
                        <textarea name="note" placeholder="请输入内容" class="layui-textarea" :readonly="isreadonly"></textarea>
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
export default {
    data(){
        return{
            sysnameList: sysnameList,
            roledata: null,  // c初始值
            isreadonly: false,   // 详情页只读
        }
    },
    created() {
        if(this.$route.params.data){
            // console.log(this.$route.params);
            this.roledata = this.$route.params.data;
            if(this.$route.params.type === 'detail'){
                this.isreadonly = true;
            }
        }
    },
    mounted(){
        layui.use(['form'], ()=>{
            var form = layui.form
            this.initForm(form);            
        })
        
    },
    methods:{
        initForm(form){
            form.render()
            this.formSubmit(form);   //绑定提交
            if(this.roledata){     // 设置初始值
                this.setVal(form);
            }
        },
        formSubmit(form){
            //监听提交
            form.on('submit(subrole)', function(data){
                console.log(data.field)
                layer.alert('提交成功', {
                    title: '最终的提交信息'
                })
                return false;
            });
        },
        // 编辑或者查看设置初始值
        setVal(form){
            form.val("formTest", {
                "name": this.roledata.name
                , "systemName": this.roledata.systemName
                , "note": this.roledata.note
            })
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