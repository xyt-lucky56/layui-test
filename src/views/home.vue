<template>
  <div class="layui-layout layui-layout-admin">
  <div class="layui-header">
    <div class="layui-logo">
      <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
      后台管理系统
    </div>
    <!-- 头部区域（可配合layui已有的水平导航） -->
      <!-- <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item"><a href="">控制台</a></li>
        <li class="layui-nav-item"><a href="">商品管理</a></li>
        <li class="layui-nav-item"><a href="">用户</a></li>
        <li class="layui-nav-item">
          <a href="javascript:;">其它系统</a>
          <dl class="layui-nav-child">
            <dd><a href="">邮件管理</a></dd>
            <dd><a href="">消息管理</a></dd>
            <dd><a href="">授权管理</a></dd>
          </dl>
        </li>
      </ul> -->
      <ul class="layui-nav layui-layout-right">
        <!-- <li class="layui-nav-item">
          <a href="javascript:;">
            <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
             {{userName}}
          </a>
          <dl class="layui-nav-child">
            <dd><a href="">基本资料</a></dd>
            <dd><a href="">安全设置</a></dd>
          </dl>
        </li> -->
        <li class="layui-nav-item">
          <a href="javascript:;"  @click="toForm('公告','/admin/notice')">公告</a>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:;"  @click="toForm('个人中心','/admin/userCenter')">个人中心</a>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:;"  @click="toForm('我要帮助','/admin/needHelp')">我要帮助</a>
        </li>
          <li class="layui-nav-item">
          <a href="javascript:;"  @click="toForm('我要吐槽','/admin/complaints')">我要吐槽</a>
        </li>
        <li class="layui-nav-item" @click="returnPage">
          <a href="javascript:;">退出</a>
        </li>
      </ul>
  </div>
  <div class="layui-side layui-bg-black">
    <div class="layui-side-scroll">
      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
      <ul class="layui-nav layui-nav-tree"  lay-filter="test">
        <li class="layui-nav-item layui-nav-itemed">
          <a href="javascript:;" @click="toForm('表单','/admin/formList')" >表单</a>
        </li>
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('普通操作表格','/admin/table')">普通操作表格</a>
        </li>
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('表格的全选反选','/admin/checkboxTable')">表格的全选反选</a>
        </li>        
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('上传文件','/admin/uploadImg')">上传文件</a>
        </li>        
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('列表懒加载','/admin/tableLazy')">列表懒加载</a>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('图片懒加载','/admin/imageLazy')">图片懒加载</a>
        </li>              
          <li class="layui-nav-item" >
          <a href="javascript:;" @click="toForm('登录组件','/admin/login')">登录组件</a>
        </li>
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('系统管理','/admin/system')">系统管理</a>
        </li>         
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('用户管理','/admin/user')">用户管理</a>
        </li>         
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('角色管理','/admin/roleManagement')">角色管理</a>
        </li>         
         <li class="layui-nav-item">
          <a href="javascript:;" @click="toForm('权限管理','/admin/permissions')">权限管理</a>
        </li>         
      </ul>
    </div>
  </div>
  <div class="layui-body">
    <!-- 内容主体区域 -->
    <div>
      <div class="layui-tab   layui-tab-brief"   lay-filter="demo">
        <ul class="layui-tab-title">
          <li  v-for="(item,index) in routerList" :key="index" :class="currIndex == index?'layui-this':''"  @click="changeComponent(item.path,index)" @contextmenu.prevent="showBrowser(item.path,index)">{{item.name}}
            <i class="layui-icon layui-icon-close" v-if="index!=0" @click.stop="removeTable(index)"></i>
          </li>
        </ul>
        <!-- 导航标签页 -->
        <div class="Delete" ref="name">
          <p class="Delete-left Delete-m"  v-show="label.leftArrow"   @click.stop="deleteLeft()" >关闭左侧标签页</p>
          <p class="Delete-left Delete-m"  v-show="label.nowArrow"    @click.stop="deleteNow()" >关闭当前标签页</p>
          <p class="Delete-right Delete-m" v-show="label.rightArrow"  @click.stop="deleteRight()" >关闭右侧标签页</p>
        </div>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="layui-footer">
    <!-- 底部固定区域 -->
    © layui.com - 底部固定区域 
  </div>
  
</div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      routerList: [{
        name: '表单',
        path: '/admin/formList'
      }],
      currIndex: 0,
      deleteIndex: 0,
      label: { //标签状态
        leftArrow: true,
        nowArrow: true,
        rightArrow: true
      }
    }
  },
  computed: {
    userName() {
      return this.$store.state.addNumber.name
    }
  },
  watch:{
    $route: {
      handler: function (val, oldVal) {
        if(val.name=='permissions'){
          sessionStorage.removeItem('subMenuId')
        }
      }
    }
  },
  created() {
    let historyRoute = localStorage.getItem('historyRoute')
    let dataIndex = localStorage.getItem('currIndex')
    if (historyRoute) {
      this.routerList = JSON.parse(historyRoute)
      this.currIndex = dataIndex;
      this.$router.push(this.routerList[dataIndex].path)
    } else {
      this.$router.push('/admin/formList')
    }
    this.save()
  },
  mounted() {
    layui.use(['layer'])
    document.addEventListener('mousedown', (e) => {   //监听页面点击事件
      if (!$(e.path[0]).hasClass("Delete-m") && this.$refs.name) {
        this.$refs.name.setAttribute('style', 'display:none');
      }
    })
  },
  methods: {
    // 显示删除弹窗
    showBrowser(path, index) {
      for (let a in this.label) {
        this.label[a] = true;
      }
      this.$refs.name.setAttribute('style', `left:${event.clientX}px;top:${event.clientY}px;display:block`);
      this.deleteIndex = index
      if (this.deleteIndex == 0) {  //索引为0，无左和当前
        this.label.nowArrow = false;
        this.label.leftArrow = false;
        if (this.routerList.length == 1) { //数组长度为1，无右
          this.label.rightArrow = false;
        }
      } else if (this.deleteIndex == 1) {//索引为1，无左
        this.label.leftArrow = false;
        if (this.routerList.length == 2) {  //数组长度为2  无右
          this.label.rightArrow = false;
        }
      } else if (this.deleteIndex == this.routerList.length - 1) {  //最后一条数，无右
        this.label.rightArrow = false;
      }
    },
    // 删除左侧
    deleteLeft() {
      this.removeData(this.deleteIndex - 1, 'left')
      this.$refs.name.setAttribute('style', 'display:none');
    },
    // 删除当前
    deleteNow() {
      this.removeData(this.deleteIndex, 'now')
      this.$refs.name.setAttribute('style', 'display:none');
    },
    // 删除右侧
    deleteRight(index) {
      this.removeData(this.deleteIndex + 1, 'right')
      this.$refs.name.setAttribute('style', 'display:none');
    },
    // 标签页的删除
    removeData(index, name) {
      this.routerList.splice(index, 1)
      switch (name) {
        case 'now':
          this.currIndex = index - 1
          break;
        default:
          if (this.currIndex >= index) {
            this.currIndex = this.currIndex - 1
          }
          break;
      }
      this.$router.push(this.routerList[this.currIndex].path)
      localStorage.setItem('historyRoute', JSON.stringify(this.routerList))
      localStorage.setItem('currIndex', this.currIndex)
    },
    // 退出
    returnPage() {
      layer.confirm('您确定要退出吗？', { btn: ['确定', '取消'] }, () => {
        layer.msg('恭喜您退出成功', { icon: 1, time: 500 });
        setTimeout(() => { this.$router.push('/') }, 1000)
      }, function () {
        layer.msg('你没有退出哦', { time: 2000, btn: ['明白了', '知道了'] });
      });
    },
    // 点击导航栏
    toForm(name, path) {
      let data = { name, path }
      let flag = this.routerList.filter((item, index) => {
        if (item.name.indexOf(name) > -1) {
          return item
        }
      })
      if (!flag.length) { //如果数组中不存在，就push
        this.routerList.push(data)
      }
      this.currIndex = this.routerList.findIndex((val, index) => { //找到当前数据在列表中的索引，使其高亮
        return val.name == name
      })
      this.$router.push(path)
      localStorage.setItem('historyRoute', JSON.stringify(this.routerList))
      localStorage.setItem('currIndex', this.currIndex)
    },
    // 点击tab栏
    changeComponent(path, index) {
      this.currIndex = index
      this.$router.push(path)
      localStorage.setItem('currIndex', this.currIndex)
    },
    // 选项卡xx按钮的删除
    removeTable(index) {
      if (this.currIndex == index) {
        this.currIndex = index - 1
      } else if (this.currIndex > index) {
        this.currIndex = index
      }
      this.routerList.splice(index, 1)
      this.$router.push(this.routerList[index - 1].path)
      localStorage.setItem('historyRoute', JSON.stringify(this.routerList))
      localStorage.setItem('currIndex', this.currIndex)
    },
    save() {
      this.setCookie('accessToken', '123456789');
      this.setCookie('useId', '10001');
      this.setCookie('useType', '01');
      this.setCookie('clientType', 'BS');
    },
     // 存 cookie
    setCookie(c_name, value) {
      this.setCookieAndTimeOut(c_name, value, 10);
    },
    // 获取token
    setCookieAndTimeOut(c_name, value, days) {
      var str = c_name + "=" + escape(value);
      if (days > 0) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        str += ";Path=/;domain=" + ".ll.com";
        str += ";expires=" + date.toGMTString();
      }
      document.cookie = str;
    },
  }
}
</script>
                                                          
<style scoped lang="less">
.layui-body {
  background-color: #f5f5f5;
  .layui-tab {
    margin-top: 0;
  }
  .layui-tab-title {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .layui-tab-content {
    background-color: #fff;
    height: 100%;
  }
  .layui-tab-title li {
    border-right: 1px solid #eee;
  }
}
.Delete {
  width: 150px;
  padding-bottom: 10px;
  text-align: center;
  border: 1px solid #ccc;
  position: fixed;
  display: none;
  z-index: 99999;
  background: #fff;
  box-shadow: 0 0px 5px #ccc;
}
.Delete-m {
  margin-top: 20px;
  cursor: pointer;
}
</style>
