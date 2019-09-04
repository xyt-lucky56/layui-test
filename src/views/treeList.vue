<template>
    <div>
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>树形组件</legend>
        </fieldset>
        <div class="layui-btn-container">
          <button type="button" class="layui-btn layui-btn-sm" lay-demo="getChecked">获取选中节点数据</button>
          <button type="button" class="layui-btn layui-btn-sm" lay-demo="setChecked">勾选指定节点</button>
          <button type="button" class="layui-btn layui-btn-sm" lay-demo="reload">重载实例</button>
          <button type="button" class="layui-btn layui-btn-sm"  @click="editorName">修改用户名</button>
        </div>
        <div id="test1" class="demo-tree-more"></div>
    </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      formData: [{
        title: '早餐'
        , id: 1
        , children: [{
          title: '油条'
          , id: 5
        }, {
          title: '包子'
          , id: 6
        }, {
          title: '豆浆'
          , id: 7
        }]
      }, {
        title: '午餐'
        , id: 2
        , checked: true
        , children: [{
          title: '藜蒿炒腊肉'
          , id: 8
        }, {
          title: '西湖醋鱼'
          , id: 9
        }, {
          title: '小白菜'
          , id: 10
        }, {
          title: '海带排骨汤'
          , id: 11
        }]
      }, {
        title: '晚餐'
        , id: 3
        , children: [{
          title: '红烧肉'
          , id: 12
          , fixed: true
        }, {
          title: '番茄炒蛋'
          , id: 13
        }]
      }, {
        title: '夜宵'
        , id: 4
        , children: [{
          title: '小龙虾'
          , id: 14
          , checked: true
        }, {
          title: '香辣蟹'
          , id: 15
          , disabled: true
        }, {
          title: '烤鱿鱼'
          , id: 16
        }]
      }]
    };
  },
  created() {
  },
  mounted() {
    layui.use(['tree', 'util'], () => {
      this.showTree(layui.tree) //渲染树形组件
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
        click: (obj) => {  //获取当前选中的节点
          // console.log('已选中的节点', obj)
        },
        oncheck: (obj) => {
          // console.log('我当前的选中', obj)
        }
      });
    },
    getTreeList(tree, util) {
      let self= this
      util.event('lay-demo', {
        getChecked: function (othis) { //获取选中节点的数据
          var checkedData = tree.getChecked('demoId1');
          self.$store.commit('changeName','牛牛1')  //vuex修改用户名
        },
        setChecked: function () { //勾选指定节点
          tree.setChecked('demoId1', [12, 16]);
        },
        reload: function () {   //重载实例
          tree.reload('demoId1', {
          });
        }
      });
    },
    // vuex修改用户名
    editorName(){
      this.$store.commit('changeName','牛牛')
    }
  }
};
</script>

<style scoped>
.view-margin {
  margin-bottom: 30px;
}
</style>

