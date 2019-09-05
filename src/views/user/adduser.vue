<template>
    <div class="adduser">
        <h1>{{title}}</h1>
        <div class="content">
            <form class="layui-form" action="">
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">用户名 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="username" v-model="info.username" placeholder="请输入用户名" lay-verify="required" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">QQ号码 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="qq" lay-verify="required|qq" placeholder="请输入QQ号码" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">姓名 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="name" placeholder="请输入姓名" v-model="info.name" lay-verify="required|name" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">电子邮箱 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="email" placeholder="请输入电子邮箱" v-model="info.email" lay-verify="required|email" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">英文名 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="englishname" placeholder="请输入姓名" lay-verify="required|englishname" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">地址 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="address" placeholder="地址" v-model="info.address" lay-verify="required" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号 :</label>
                        <div class="layui-input-inline">
                            <input type="tel" name="phone" placeholder="请输入手机号" v-model="info.phone" lay-verify="required|phone" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">邮政编码 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="zipcode" placeholder="邮政编码" v-model="info.zipcode" lay-verify="required|zipcode" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">联系电话 :</label>
                        <div class="layui-input-inline">
                            <input type="tel" name="phoneNumber" placeholder="请输入联系电话" v-model="info.phoneNumber" lay-verify="required|phoneNumber" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">用户类型 :</label>
                        <div class="layui-input-inline">
                            <select name="userType" lay-verify="required" v-model="info.userType">
                                <!-- <option value="">直接选择或搜索选择</option> -->
                                <option v-for="(item,index) in userTypes" :key='index' :value="item.type">{{item.type}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">所属部门 :</label>
                        <div class="layui-input-inline">
                            <select name="department" lay-verify="required" v-model="info.department">
                                <option v-for="(item,index) in departments" :key='index' :value="item.title">{{item.title}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">备注 :</label>
                        <div class="layui-input-inline">
                            <textarea name='textarea' placeholder="请输入内容" class="layui-textarea"></textarea>
                        </div>
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
export default {
    data(){
        return{
            title:'添加用户',
            userTypes:[
                {type:'运营人员'},
                {type:'司机'},
                {type:'供应商'},
            ],
            departments:[
                {title:'平台事业部'},
                {title:'研发部'},
                {title:'财务部'},
                {title:'人事部'},
            ],
            info:{}
        }
    },
    created(){
        if(JSON.stringify(this.$route.params)!='{}'){
            this.info=this.$route.params.data
            console.log(this.info)
            this.title="用户编辑"
        }
    },
    mounted(){
        layui.use(['form'], ()=>{
            var form = layui.form
            form.render()
            this.formSubmit(form)
            this.checkForm(form)
        })
    },
    methods:{
        formSubmit(form){
            //监听提交
            form.on('submit(demo1)', (data)=>{
                console.log(data.field)
                // this.$message.success('提交成功')
                // this.$router.push('/user')
                
            });
        },
        checkForm(form){
            form.verify({
                qq:[/^[1-9][0-9]{4,9}$/,'QQ号格式不正确'],
                name:[/^[\u2E80-\u9FFF]+$/,'姓名输入不合法'],
                englishname:[/^[a-zA-Z]+$/,'英文名输入不合法'],
                zipcode:[/^[1-9][0-9]{5}$/,'邮政编码不符合规则'],
                // phoneNumber:[/0\d{2,3}-\d{7,8}/,'联系电话不符合规则'],
                phoneNumber:[/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|(0\d{10})$/,'联系电话不符合规则']
            })
        },
        cancel(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less" scope>
    .adduser{
        width: 80%;
        text-align: center;
        h1{
            margin-top: 30px;
        }
        .content{
            margin: 20px; 
            .layui-form{
                padding-top: 20px;
                margin: 0 auto;
                .layui-form-item{
                    .layui-inline{
                        margin-right: 50px;
                        vertical-align: top;                        
                    }
                    .layui-textarea{
                        resize:none;
                    }
                } 
            }
        }
    }
</style>