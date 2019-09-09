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
export default {
    data(){
        return{
            data:[                
                {title: '超级管理员',id: 100,children:[
                    {title:'管理员',id: 1001},
                    {title:'平台负责人',id: 1002}
                ]},
                {title:'司机',id: 101},
                {title:'供应商',id: 102},
                {title:'普通用户',id: 103},
            ],
            info:{}
        }
    },
    mounted(){
        layui.use(['tree','jquery'], ()=>{
            var tree = layui.tree,
            $=layui.jquery
            tree.render({
                elem: '#test2',
                data:this.data,
                showLine: false,  //是否开启连接线
                accordion: true,//手风琴模式                
                click: (obj)=>{
                    // console.log(obj)
                    if(!obj.data.children){
                        this.info={}
                        this.info = obj.data;  //获取当前点击的节点数据   
                        $('div.layui-tree-set').each(function(){
                            $(this).removeClass('tree-active')
                        })
                        obj.elem.addClass('tree-active')
                    }
                }
            }) 
        })
    },
    methods:{
        submit(){
            layer.msg(JSON.stringify(this.info))
            console.log(this.info)
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