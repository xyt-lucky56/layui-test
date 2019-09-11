<template>
    <div class="subsystem">
        <h1>{{title}}</h1>
        <div class="content">
            <form class="layui-form" action="" lay-filter="example">
                <div class="layui-form-item">                
                    <label class="layui-form-label">系统名称 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="systemname" :readonly="status" lay-verify="required" autocomplete="off" placeholder="请输入系统名称" lay-verType='tips' class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">系统描述 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="systemcontent" :readonly="status" lay-verify="required" autocomplete="off" placeholder="请输入系统描述" lay-verType='tips' class="layui-input ">
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">系统版本号 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="versionno" :readonly="status" lay-verify="required|version" autocomplete="off" placeholder="请输入系统版本号" lay-verType='tips' class="layui-input">
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">展示顺序 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="sortno" :readonly="status" lay-verify="required|number" autocomplete="off" placeholder="请输入展示顺序" lay-verType='tips' class="layui-input">
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">起始页面 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="initpage" :readonly="status" lay-verify="required" autocomplete="off" placeholder="请输入起始页面" lay-verType='tips' class="layui-input">
                    </div>
                </div> 
                <div class="layui-form-item">
                    <div class="layui-input-block submit">
                        <div v-if="status" class="layui-btn layui-btn-primary addbtn" @click="cancel">返回</div>
                        <div v-else>
                            <div class="layui-btn addbtn" lay-submit="" lay-filter="demo1">保存</div>
                            <div v-if="flag" class="layui-btn layui-btn-primary addbtn" @click="cancel">返回</div>
                            <div v-else class="layui-btn layui-btn-primary addbtn" @click="cancel">取消</div>
                        </div>
                    </div>
                </div>               
            </form>
        </div>
    </div>
</template>
<script>
import { versionNum } from '@/filter/regular'
import { querySubsystem,editSubsystem,addSubsystem } from '@/api/api'
export default {
    data(){
        return{
            title:'添加子系统',
            status:false,
            flag:false,
            systemInfo:{},
            version:'',
            id:'',
            form:''
        }
    },
    created(){
        if(JSON.stringify(this.$route.params)!='{}'){
            this.id=this.$route.params.data.id
            this.getSystemInfo()
            if(this.$route.params.flag){
                this.flag=this.$route.params.flag
                this.title="子系统编辑"
            }else{
                this.status=true
                this.title="子系统详情"
            }
        }
    },
    mounted(){
        layui.use(['form'], ()=>{
            var form = layui.form
            this.form=form
            form.render()            
            this.formSubmit(form)
            this.checkForm(form)
        })
    },
    methods:{
        getSystemInfo(){
            let params={
                id:this.id
            }
            querySubsystem(params).then(res=>{
                // console.log(res)
                if(res.code==0){
                    this.systemInfo=res.data
                    //表单初始赋值
                    this.form.val('example', {
                        'systemname':this.systemInfo.systemname,
                        'systemcontent':this.systemInfo.systemcontent,
                        'versionno':this.systemInfo.versionno,
                        'sortno':this.systemInfo.sortno,                
                        'initpage':this.systemInfo.initpage,                
                    })
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        formSubmit(form){
            //监听提交
            form.on('submit(demo1)', (data)=>{
                // console.log(data.field)
                let params={
                    id:this.id,
                    systemname:data.field.systemname,
                    systemcontent:data.field.systemcontent,
                    versionno:data.field.versionno,
                    sortno:data.field.sortno,
                    initpage:data.field.initpage,
                    remark:'',
                }
                if(this.id){
                    let obj={
                        id:this.id
                    }
                    params=Object.assign(params,obj)
                    editSubsystem(params).then(res=>{
                        // console.log(res)
                        if(res.code==0){
                            this.$message.success('编辑成功')
                            this.$router.push('/admin/system')
                            return false
                        }else{
                            this.$message.error(res.msg);
                        }
                    })               
                }else{                    
                    addSubsystem(params).then(res=>{
                        console.log(res)
                        if(res.code==0){
                            this.$message.success('提交成功')
                            this.$router.push('/admin/system')
                            return false
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }
            });
        },
        checkForm(form){
            form.verify({
                versionno:[/^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/,'版本号不符合规则']
            })
        },
        cancel(){
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
            margin-top: 30px;
        }
        .content{
            margin: 20px; 
            .layui-form{
                // width: 25%;
                width: 330px;
                padding-top: 20px;
                margin: 0 auto;
                .layui-input-block{
                    span{
                        display: inline-block;
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        text-align: left;
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