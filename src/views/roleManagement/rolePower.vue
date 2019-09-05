<template>
    <div class="subsystem">
        <h1>角色权限分配</h1>
        <div class="content">
            <div id="test1" class="demo-tree-more"></div>
            <div class="layui-input-block submit">
                <div class="layui-btn addbtn" @click="subPower">确定</div>
                <div class="layui-btn layui-btn-primary addbtn" @click="goback">取消</div>
            </div>
        </div>       
    </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      formData: [{
        title: '用户管理'
        , id: 1
        , children: [{
          title: '添加用户'
          , id: 3
        }, {
          title: '批量删除'
          , id: 4
        }, {
          title: '角色分配'
          , id: 5
        },{title: '用户编辑'
          , id: 6
        },{title: '用户详情'
          , id: 7
        },{title: '用户删除'
          , id: 8
        }]
      }, {
        title: '角色管理'
        , id: 2
        , children: [{
          title: '添加角色'
          , id: 9
        }, {
          title: '批量删除'
          , id: 10
        }, {
          title: '权限分配'
          , id: 11
        }, {
          title: '角色编辑'
          , id: 12
        }]
      }],
      tree: null,
    };
  },
  created() {
  },
  mounted() {
    layui.use(['tree', 'util'], () => {
      this.showTree(layui.tree) //渲染树形组件
      this.tree = layui.tree;
      this.getTreeList(layui.tree, layui.util) //获取已选中的节点
    });
  },
  methods: {
    // //渲染树形组件
    showTree(tree) {
      tree.render({
        elem: '#test1',   //绑定元素
        id: 'demoId1',
        data: this.formData,
        showCheckbox: true,
        // click: (obj) => {  //获取当前选中的节点
        //   // console.log('已选中的节点', obj)
        // },
        // oncheck: (obj) => {
        //   // console.log('我当前的选中', obj)
        // }
      });
    },
    getTreeList(tree, util) {
      let self= this
      util.event('lay-demo', {
        getChecked: function (othis) { //获取选中节点的数据
          var checkedData = tree.getChecked('demoId1');
          console.log(checkedData)
        },
        // setChecked: function () { //勾选指定节点
        //   tree.setChecked('demoId1', [12, 16]);
        // },
        reload: function () {   //重载实例
          tree.reload('demoId1', {
          });
        }
      });
    },
    subPower() {
        var checkData = this.tree.getChecked('demoId1');
        console.log(checkData);
    },
    goback(){
        this.$router.back(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.subsystem{
    width: 80%;
    text-align: center;
    h1{
        margin-top: 50px;
    }
    .content{
        margin: 20px; 
        .demo-tree-more{
            width: 200px;
            padding-top: 20px;
            margin: 0 auto;
            text-align: left;
        }
        .submit{
            margin-left: 50px;
            padding-top: 30px;
        }       
    }
}
</style>