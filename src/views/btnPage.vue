<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>有悬浮框的普通按钮</legend>
    </fieldset>
    <!-- 按钮一   （需要写样式）-->
        <ul class="list-menu"> 
            <li>
                <button class="layui-btn" @click="changeName">按算法分类 <i class="layui-icon" :class="showClass?'layui-icon-up':'layui-icon-down'"></i></button>
                <ul :class="showClass?'view-show':'view-hide'"> 
                    <a href="#"><li>分治</li></a> 
                    <a href="#"><li>贪心</li></a> 
                    <a href="#"><li>链表</li></a> 
                </ul> 
            </li> 
        </ul>
        <!-- 按钮二 （不需要写样式，需要写js）-->
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
            <legend>水平导航菜单</legend>
        </fieldset>
            <ul class="layui-nav" lay-filter="navTree">
              <li class="layui-nav-item"><a href="">最新活动</a></li>
              <li class="layui-nav-item layui-this">
                  <a href="javascript:;">产品</a>
                  <dl class="layui-nav-child">
                  <dd><a href="javascript:;">选项1</a></dd>
                  <dd><a href="javascript:;">选项2</a></dd>
                  <dd><a href="javascript:;">选项3</a></dd>
                  </dl>
              </li>
              <li class="layui-nav-item"><a href="">大数据</a></li>
              <li class="layui-nav-item">
                  <a href="javascript:;">解决方案</a>
                  <dl class="layui-nav-child">
                  <dd><a href="javascript:;">移动模块</a></dd>
                  <dd><a href="javascript:;">后台模版</a></dd>
                  <dd class="layui-this"><a href="javascript:;">选中项</a></dd>
                  <dd><a href="javascript:;">电商平台</a></dd>
                  </dl>
              </li>
              <li class="layui-nav-item"><a href="javascript:;">社区</a></li>
            </ul>
        </div>
</template>
<script>
export default {
  props: {

  },
  data() {
    return {
      showClass: false
    };
  },
  created() {

  },
  mounted() {
    layui.use(['element'],() =>{
      const element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
      element.render()
      this.getNavTree(element); //监听导航点击
    });
  },
  methods: {
    changeName() {
      this.showClass = !this.showClass
    },
    // 监听导航点击
    getNavTree(element) {
      element.on('nav(navTree)', function (elem) {
        layer.msg(elem.text());
      });
    }
  }
};
</script>

<style scoped>
.list-menu {
  display: flex;
  border-radius: 5px;
  padding: 10px 0;
  justify-content: space-around;
  color: #205d67;
  height: 300px;
}

.list-menu li ul {
  position: absolute;
  display: none;
  border-radius: 5px;
  width: 106px;
  margin: 0;
  padding: 0;
  background-color: #fff;
  border: 1px solid #eee;
  color: #205d67;
  font-size: 0.9rem;
  margin-top: 5px;
}

.list-menu li ul a {
  text-decoration: none;
  color: #205d67;
}
.list-menu li ul a li {
  line-height: 30px;
  padding-left: 10%;
  box-sizing: border-box;
  width: 100%;
}
.list-menu li ul a li:hover {
  background-color: #5fb878;
  color: #fff;
}
.list-menu .view-show {
  cursor: pointer;
  display: block;
}

.view-title {
  margin-top: 100px;
}
</style>
