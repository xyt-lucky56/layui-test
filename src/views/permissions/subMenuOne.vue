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
                        <select name="systemname" lay-verify="required|systemname">
                            <option value="">请选择系统名称</option>
                            <option v-for="(item,index) in systemnameList" :key='index' :value="item.systemname">{{item.systemname}}</option>
                        </select>
                    </div>
                </div>                
                <div class="layui-form-item">                
                    <label class="layui-form-label">图片路径 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="picpath" lay-verify="required|picpath" autocomplete="off" placeholder="请输入图片路径" lay-verType='tips' class="layui-input">
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
                        <select name="isexpand" lay-verify="required|isexpand">
                            <option value="">请选择是否展开</option>
                            <option v-for="(items,index) in isexpandList" :key='index' :value="items.val">{{items.lab}}</option>
                            <!-- <option value="true">是</option>
                            <option value="false">否</option> -->
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">                
                    <label class="layui-form-label">出现顺序 :</label>
                    <div class="layui-input-block">
                        <input type="text" name="sortno" lay-verify="required|number" autocomplete="off" placeholder="请输入出现顺序" lay-verType='tips' class="layui-input">
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
            <fieldset class="layui-elem-field layui-field-title" v-if="status">
                <legend v-show="status">子菜单列表</legend>
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
import { queryGroupinfoById,querySysnameList,editGroupinfo,addGroupinfos,deletePowerinfos } from '@/api/api'
import { filterData } from '@/filter/groupList'
import FengunionTable from '@/utils/comTable'//表格封装
// import  { setCookie } from '@/utils/cookie'
export default {
    data(){
        return{
            title:'添加一级菜单',
            info:{},            
            systemnameList:[],//系统名称
            subSystemOneList:[],//子菜单列表
            status:false,
            cols:[[
                {field:'id', title: 'ID',width:80,sort: true},
                {field:'powername', title: '菜单名称',width:150},
                {field:'formtype', title: '界面类型'},
                {field:'powertype', title: '权限类型'},
                {field:'picname', title: '图片名称',templet:function(res){
                    return filterData(res.picname)
                }},
                {field:'relativepath', title: '相对文件路径'},
                {field:'filename', title: '相对文件名称'},
                {field:'remark', title: '菜单描述',templet:function(res){
                    if(res.remark&&res.remark!=null){
                        return res.remark
                    }else{
                        return '无'
                    }
                }},
                {field:'status', title: '操作',toolbar: '#barDemo',width:200,fixed: 'right'},
            ]],
            isexpandList:[{val:false,lab:'否'},{val:true,lab:'是'}],
            id:'',
            form:'',
            tableIns:''
        }
    },
    created(){
        this.getSystem()
        if(JSON.stringify(this.$route.params)!='{}'){
            this.id=this.$route.params.data.id
            sessionStorage.setItem('subMenuId',this.id)
            this.title='菜单编辑'     
            this.status=true 
            this.getSubmenuInfo()
        }else if(sessionStorage.getItem('subMenuId')){
            // console.log(sessionStorage.getItem('subMenuId'))
            this.id=sessionStorage.getItem('subMenuId')
            this.title='菜单编辑'
            this.status=true   
            this.getSubmenuInfo()
        }         
    },
    mounted(){            
        layui.use(['form','table'], ()=>{
            var form = layui.form,
            table=layui.table
            this.form=form
            form.render()
            this.tableIns = table.render({
                elem: '#menuOneTest',
                cols:this.cols,
                data:this.subSystemOneList,
                page:true,
                done:function(res, curr, count){
                    // console.log(res)
                }
            })           
            this.formSubmit(form)
            this.statusChange(table)
            this.checkForm(form)            
        })
        // if(this.status){
        //     FengunionTable('menuOneTest', 'api/api-a-bkf-/user-mucon/system/queryPowerinfo', this.cols, {id:this.id}, true,this.limit,'post',function(e){
        //         console.log(e)
        //     })
        // }
    },   
    updated(){          
        layui.use(['form'], ()=>{
            layui.form.render()
        })
    },
    methods:{
        getSystem(){//获取系统名称
            querySysnameList().then(res=>{
                // console.log(res)
                if(res.code==0){
                    this.systemnameList=res.data
                }
            })
        },
        getSubmenuInfo(){//获取详情
            let params={
                id:this.id
            }
            queryGroupinfoById(params).then(res=>{
                console.log(res)
                if(res.code==0){
                    this.info=res.data
                    this.subSystemOneList=res.totalData
                    this.tableIns.reload({
                        data:this.subSystemOneList
                    })
                    setTimeout(()=>{
                        this.form.render()
                        this.form.val('example', {
                            'groupname':this.info.groupname,
                            'systemname':this.info.systemname,
                            'picpath':this.info.picpath,
                            'picname':this.info.picname,
                            'isexpand':JSON.stringify(this.info.isexpand),
                            'sortno':this.info.sortno,
                            'remark':this.info.remark,
                        })
                    },100)            
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
                    groupname:data.field.groupname,
                    systemname:data.field.systemname,
                    picpath:data.field.picpath,
                    picname:data.field.picname,
                    isexpand:data.field.isexpand,
                    sortno:data.field.sortno,
                    remark:data.field.remark,
                }
                if(this.id){
                    let obj={
                        id:this.id
                    }
                    params=Object.assign(params,obj)
                    editGroupinfo(params).then(res=>{
                        if(res.code==0){
                            this.$message.success('修改成功')
                            this.$router.push('/admin/permissions')
                            return false
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }else{                    
                    addGroupinfos(params).then(res=>{
                        if(res.code==0){
                            this.$message.success('提交成功')
                            this.$router.push('/admin/permissions')
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
                // menuName:[/^[\u2E80-\u9FFF]+$/,'菜单名称不合法'],
                picname:[/[^\s]+\.(jpg|jpeg|png|bmp)/i,'图片名称不合法'],
            })
        },
        statusChange(table){
            table.on('tool(menuOneTest)', (obj)=>{
                var data = obj.data//得到所在行所有键值
                    // console.log(data)
                if(obj.event === 'edit'){//编辑
                    this.$router.push({name:'subMenuChild',params:{data}});
                }else if(obj.event === 'del'){
                    layer.confirm('真的删除么', (index)=>{
                        let params={
                            id:data.id
                        }
                        deletePowerinfos(params).then(res=>{
                            if(res.code==0){
                                this.$message.success('删除成功')
                                // table.reload('menuOneTest', {
                                //     where:{id:this.id},
                                //     url: 'api/api-a-bkf-/user-mucon/system/queryPowerinfo'
                                // });
                                // layer.close(index);
                                let stem={
                                    id:this.id
                                }
                                queryGroupinfoById(stem).then(res=>{
                                    if(res.code==0){                                        
                                        this.subSystemOneList=res.totalData                                       
                                        this.tableIns.reload({
                                            data:this.subSystemOneList
                                        })
                                        layer.close(index);
                                    }
                                })
                            }else{
                                layer.close(index);
                                this.$message.error(res.msg);
                            }
                        })                        
                    });
                }
            });
        },
        cancel(){
            this.$router.push('/admin/permissions')
            // this.$router.back(-1);
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