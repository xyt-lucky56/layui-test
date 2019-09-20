<template>
    <div class="adduser">
        <h1>{{title}}</h1>
        <div class="content">
            <form class="layui-form" action="" lay-filter="example">
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">用户名 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="username" placeholder="请输入用户名" lay-verify="required" lay-verType='tips' autocomplete="off" class="layui-input">
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
                            <input type="text" name="name" placeholder="请输入姓名" lay-verify="required|name" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">电子邮箱 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="email" placeholder="请输入电子邮箱" lay-verify="required|email" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">英文名 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="englishname" placeholder="请输入姓名" lay-verify="required|englishName" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">地址 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="address" placeholder="地址" lay-verify="required" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号 :</label>
                        <div class="layui-input-inline">
                            <input type="tel" name="mobile" placeholder="请输入手机号" lay-verify="required|mobile" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">邮政编码 :</label>
                        <div class="layui-input-inline">
                            <input type="text" name="postcode" placeholder="邮政编码" lay-verify="required|postCode" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">联系电话 :</label>
                        <div class="layui-input-inline">
                            <input type="tel" name="tel" placeholder="请输入联系电话" lay-verify="required|tel" lay-verType='tips' autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">用户类型 :</label>
                        <div class="layui-input-inline">
                            <select name="usertype" lay-verify="required|usertype">
                                <option value="">请选择用户类型</option>
                                <option v-for="(item,index) in userTypeList" :key='index' :value="item.val">{{item.label}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item"> 
                    <div class="layui-inline">
                        <label class="layui-form-label">所属部门 :</label>
                        <div class="layui-input-inline">
                            <select name="deptid" lay-verify="required">
                                <option value="">请选择所属部门</option>
                                <option v-for="(item,index) in depList" :key='index' :value="item.val">{{item.label}}</option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">系统名称 :</label>
                        <div class="layui-input-inline"> 
                            <select name="systemname" lay-verify="required|systemName">
                                <option value="">请选择系统名称</option>
                                <option v-for="(item,index) in systemnameList" :key='index' :value="item.systemname">{{item.systemname}}</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">备注 :</label>
                        <div class="layui-input-inline">
                            <textarea name='remark' placeholder="请输入内容" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="layui-inline">
                       <label class="layui-form-label"></label>
                        <div class="layui-input-inline">
                            <!-- <textarea name='remark' placeholder="请输入内容" class="layui-textarea"></textarea> -->
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
import { userTypeList } from "@/filter/groupList"
import { querySysnameList, getDeptList, addUser, editUserinfo, cheackUsername } from '@/api/api'
export default {
    data(){
        return{
            title:'添加用户',
            userTypeList: userTypeList,
            depList:[],
            departments:[
                {title:'平台事业部'},
                {title:'研发部'},
                {title:'财务部'},
                {title:'人事部'},
            ],
            systemnameList:[],//系统名称
            info:{}
        }
    },
    created(){
        this.getSystem();
        this.getDepts();
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
            //表单初始赋值
            form.val('example', {
                'username':this.info.username,
                'qq': this.info.qq,
                'name':this.info.name,
                'englishname': this.info.englishname,
                'email':this.info.email,
                'address':this.info.address,
                'mobile':this.info.mobile,
                'postcode':this.info.postcode,
                'tel':this.info.tel,
                'usertype':this.info.usertype,
                'deptid': this.info.deptid, 
                'systemname': this.info.systemName, 
                'remark': this.info.remark
            })
            this.formSubmit(form)
            this.checkForm(form)
        })
    },
    updated() {
        this.showForm();
    },
    methods:{
        getSystem(){//获取系统名称
            querySysnameList().then(res=>{
                if(res.code==0){
                    this.systemnameList=res.data
                }
            })
        },
        // 获取所有部门
        getDepts() {
            getDeptList().then(res => {
                var treedata = [];
                if(res.data.length>=1){
                    var list = res.data;
                    for(let a = 0; a < list.length; a++){
                        let menutwo = list[a];
                        let obj2 = {};
                        obj2.val = menutwo.id;
                        obj2.label = menutwo.deptName;
                        treedata.push(obj2);
                    } 
                }
                this.depList = treedata;
                setTimeout(() => {
                    this.showForm();
                },100)
                
            })
        },
        
        formSubmit(form){
            //监听提交
            form.on('submit(demo1)', (data)=>{
                // console.log(data.field);
                let dataon = data.field;                
                if(this.info.id){
                    let params = {
                        id: this.info.id,
                        deptid: dataon.deptid,  //部门Id
                        username: dataon.username,         //用户名
                        // password: dataon.password,            //密码
                        name: dataon.name,                       //姓名
                        englishname: dataon.englishname,        //英文名字
                        // portrait: "",                          //头像地址
                        mobile: dataon.mobile,     //手机
                        tel: dataon.tel,                                   //电话
                        qq: dataon.qq,                //QQ
                        email: dataon.email,     //电子邮箱
                        address: dataon.address,                  //地址
                        postcode: dataon.postcode,                //邮编
                        usertype: dataon.usertype,                        //用户类型
                        systemname: dataon.systemname,
                        remark: dataon.remark                            //
                    }               
                    editUserinfo(params).then(res => {
                        if(res.code === 0){                            
                            this.$message.success('用户编辑成功');
                            setTimeout(() => {
                                this.$router.push({name: 'user'});
                            },1000)                            
                        }else{
                            this.$message.warning(res.msg);
                        }
                    })
                }else {   // 添加用户
                    // 校验用户名
                    let cheackData = {
                        username: dataon.username,
                        mobile: null
                    }
                    cheackUsername(cheackData).then(res => {
                        if(res.code === 0){
                            if(res.count === 0){

                                // 校验手机号
                                let cheackData2 = {
                                    username: null,
                                    mobile: dataon.mobile
                                }
                                cheackUsername(cheackData2).then(res => {
                                    if(res.code === 0){
                                        if(res.count === 0){
                                            let params = {
                                                deptid: dataon.deptid,  //部门Id
                                                username: dataon.username,         //用户名
                                                name: dataon.name,                       //姓名
                                                englishname: dataon.englishname,        //英文名字 
                                                mobile: dataon.mobile,     //手机
                                                tel: dataon.tel,                                   //电话
                                                qq: dataon.qq,                //QQ
                                                email: dataon.email,     //电子邮箱
                                                address: dataon.address,                  //地址
                                                postcode: dataon.postcode,                //邮编
                                                usertype: dataon.usertype,                        //用户类型
                                                systemname: dataon.systemname,
                                                remark: dataon.remark                             //
                                            }
                                            addUser(params).then(res => {
                                                if(res.code === 0){                           
                                                    this.$message.success('用户添加成功');
                                                    setTimeout(() => {
                                                        this.$router.push({name: 'user'});
                                                    },1000)
                                                }else{
                                                    this.$message.warning(res.msg);
                                                }
                                            })
                                        }else if (res.count > 0){
                                            this.$message.warning('该手机号已注册')
                                        }
                                    }    
                                })
                            }else if (res.count > 0){
                                this.$message.warning('该用户名已注册')
                            }
                        }
                    })
                }
                
            });
        },
        checkForm(form){
            form.verify({
                username: function(value, item){ //value：表单的值、item：表单的DOM对象
                    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                    return '用户名不能有特殊字符';
                    }
                    if(/(^\_)|(\__)|(\_+$)/.test(value)){
                    return '用户名首尾不能出现下划线\'_\'';
                    }
                    if(/^\d+\d+\d$/.test(value)){
                    return '用户名不能全为数字';
                    }
                },
                qq:[/^[1-9][0-9]{4,9}$/,'QQ号格式不正确'],
                name:[/^[\u2E80-\u9FFF]+$/,'姓名输入不合法'],
                englishName:[/^[a-zA-Z]+$/,'英文名输入不合法'],
                postCode:[/^[1-9][0-9]{5}$/,'邮政编码不符合规则'],
                // phoneNumber:[/0\d{2,3}-\d{7,8}/,'联系电话不符合规则'],
                tel:[/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|(0\d{10})$/,'联系电话不符合规则']
            })
        },
        showForm() {
            layui.use(['form'], ()=>{
                var form = layui.form
                form.render()
                //表单初始赋值
                form.val('example', {
                    'username':this.info.username,
                    'qq': this.info.qq,
                    'name':this.info.name,
                    'englishname': this.info.englishname,
                    'email':this.info.email,
                    'address':this.info.address,
                    'mobile':this.info.mobile,
                    'postcode':this.info.postcode,
                    'tel':this.info.tel,
                    'usertype':this.info.usertype,
                    'deptid':this.info.deptid,
                    'systemname': this.info.systemname,
                    'remark': this.info.remark
                })
            })
        },
        cancel(){
            this.$router.push({name: 'user'});
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