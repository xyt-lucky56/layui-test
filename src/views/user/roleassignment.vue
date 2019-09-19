<template>
    <div class="roleassignment">
        <h1>角色分配</h1>
        <div class="content">
            <div class="role-tree">
                <span class="title">请选择角色</span>
                <div id="test2" class="demo-tree"></div>
            </div>
            <div class="role-btn">
                <div class="layui-btn addbtn" @click="submit">确定</div>
                <div class="layui-btn layui-btn-primary addbtn" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getRolesOfSystem, assignRole } from '@/api/api'
export default {
    data(){
        return{
            treeData:[],
            roleList: [],
            info: {},
            userId: '',
            systemname: '',
            tree: null,

        }
    },
    created() {
        // console.log(this.$route.params);
        if(this.$route.params.id){
            this.userId = this.$route.params.id;
            this.systemname = this.$route.params.systemname;
            this.getRoles();
        }
    },
    // mounted(){
    //     this.showtree();
    // },
    methods:{
        // 查询所有角色列表
        getRoles() {
            let parmas = {
                userId: this.userId,
                systemname: this.systemname
            }
            getRolesOfSystem(parmas).then(res => {
                if(res.code === 0){                            
                    var list = res.data.list;
                    var treeData = [];
                    for(let i = 0; i < list.length; i++){
                        let menuone = list[i];
                        let obj1 = {};
                        obj1.id = menuone.id;
                        obj1.title = menuone.rolename;
                        treeData.push(obj1);
                    }
                    this.treeData = treeData;

                    if(res.data.roleList.length){
                        var list1 = res.data.roleList, roleList=[];
                        for(let i = 0; i < list1.length; i++){
                            let menuone = list1[i];
                            roleList.push(menuone.id);
                        }
                        console.log(roleList);
                        this.roleList = roleList;
                    }
                    
                    this.showtree();
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        submit(){
            var checkData = this.tree.getChecked('demoId1');
            var list = [];
            for(let i = 0; i < checkData.length; i++){
                let menuone = checkData[i];              
                list.push(menuone.id); 
            }
            let params = {
                userId: this.userId,
                roles: list
            }
            console.log(params);
            assignRole(params).then(res => {
                if(res.code === 0){
                    this.$message.success('角色分配成功')       
                    setTimeout(() => {
                        this.$router.push({name: 'user'});
                    },1000)          
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        // 渲染树形组件
        showtree(){
            layui.use(['tree','jquery'], ()=>{
                var tree = layui.tree;
                this.tree = layui.tree;
                tree.render({
                    elem: '#test2',
                    id: 'demoId1',
                    data: this.treeData,
                    showCheckbox: true              
                })

                tree.setChecked('demoId1', this.roleList); 
            })
        },
        cancel(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less" scope>
    .roleassignment{
        text-align: center;
        min-height:600px;
        width: 80%;
        h1{
            margin-top: 30px;
        }
        .content{
            width: 600px;
            margin: 0 auto;
            // padding: 50px;
            text-align: left;            
            .role-tree{
                width: 50%;
                height: 300px;
                border: 1px solid #1ab394;
                margin: 50px 150px;
                .title{
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    background-color: #1ab394;
                    padding-left: 20px;
                }
            }
            .role-btn{
                margin:0 165px;
            }
        }
    }
    .tree-active{
        background: #6565;
    }
</style>