<!--拖动验证组件-->
<template>
<div class="view-main">
  <div class="container">
        <div class="loginContainer">
          <div class="login_title">用户登录</div>
          <div class="userName input"><span class="inputText">手机号</span> <input type="number"  placeholder="请输入注册手机号" v-model="userName" @blur="validateUserName"></div>
          <div class="error" v-if="!isUserName">{{userNameErrorInfo}}</div>
          <div class="password input"><span class="inputText">密码</span> <input type="password"  minlength="6" maxlength="10" placeholder="请输入登录密码" v-model="password" @blur="validatePassword"></div>
          <div class="error" v-if="!isPassword">{{passwordErrorInfo}}</div>
          <div class="movebox">
              <div class="movego"></div>
              <div class="txt" id="txt">按住滑块,拖动到最右边</div>
              <div class="move moveBefore" v-move ></div>
          </div>
          <button @click="login">登录</button>
          <div class="footer">
            <span @click="forgetPassword">忘记密码？</span> | <span @click="register">注册账户</span>
          </div>
        </div>
  </div>
</div>

  
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      password: '',
      isUserName: true,
      userNameErrorInfo: '请填写手机号',
      passwordErrorInfo: '请填写密码',
      isPassword: true,
      formPath: '',
      queryData: null
    }
  },
  directives: {
    move(el) {
      el.onmousedown = function (e) {
        var X = e.clientX - el.offsetLeft;
        document.onmousemove = function (e) {
          var endx = e.clientX - X;
          el.className = "move moveBefore";
          el.style.left = endx + "px";
          var width = document.querySelector(".movebox").offsetWidth - document.querySelector(".move").offsetWidth;
          el.parentNode.children[0].style.width = endx + "px";
          el.parentNode.children[1].innerHTML = "按住滑块,拖动到最右边";
          //临界值小于
          if (endx <= 0) {
            el.style.left = 0 + "px";
            el.parentNode.children[0].style.width = 0 + "px";
            //document.querySelector('.movego').width(0)
          }
          //临界值大于
          if (parseInt(el.style.left) >= width) {
            el.style.left = width + "px";
            el.parentNode.children[0].style.width = width + "px";
            el.parentNode.children[1].innerHTML = "<span style='color:#fff'>验证通过</span>";
            el.className = "move moveSuccess";
            el.onmousedown = null;
            //利用session判断状态
            sessionStorage.setItem("move", "1");
          }
        };
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    }
  },
  mounted() {
    sessionStorage.removeItem("move")
    let query = this.$route.query
    this.userName = query.phone
    this.formPath = query.path
    this.queryData = query.data
  },
  methods: {
    gotoIndex() {
      this.$router.push("./index");
    },
    forgetPassword() {
      this.$router.push({ path: './forgetPassword', query: { phone: this.userName } });
    },
    register() {
      this.$router.push("./register");
    },
    validateUserName() {
      if (!this.userName) {
        this.userNameErrorInfo = '请填写手机号'
        this.isUserName = false
        return false
      }
      if (!(/^1[3456789]\d{9}$/.test(this.userName))) {
        this.userNameErrorInfo = '手机号格式不正确'
        this.isUserName = false
        return false
      }
      this.isUserName = true
      return true
    },
    validatePassword() {
      if (!this.password) {
        this.isPassword = false
        return false
      }
      this.isPassword = true
      return true
    },
    login() {
      this.$router.push('/admin/role')
      let parames = {
        loginType: 0,
        mobile: this.userName,
        passWord: this.password
      }
      if (this.validateUserName() && this.validatePassword()) {
        if (sessionStorage.getItem("move")) {
          //发送登录的网络请求
        }
      }
    }
  }
};
</script>
<style >
.loginContainer .el-input__inner {
  border: none;
}
</style>
<style scoped lang="less">
.view-main {
  height: 100%;
  background-color: #2F4056
}
.container {
  background: #2F4056;
  padding-top: 138px;
  .loginContainer {
    width: 480px;
    height: 480px;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 52px 64px 0px 57px;
    margin: auto;
    background: #fff;
    text-align: center;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
    .login_title {
      font-size: 26px;
      font-weight: bold;
      color: #0e88e5;
    }
    .error {
      text-align: left;
      color: red;
    }

    .input {
      line-height: 45px;
      background: rgba(247, 247, 247, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      margin-top: 21px;
      padding: 0 20px;
      text-align: left;
      position: relative;
      span {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        display: inline-block;
      }
      .inputText {
        width: 50px;
      }
      img {
        position: absolute;
        width: 21px;
        height: 21px;
        top: 12px;
        right: 12px;
        border-radius: 50%;
      }
      input {
        background: rgba(247, 247, 247, 1);
        box-sizing: border-box;
        width: 250px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }

    .userName {
      margin-top: 39px;
    }
    .movebox {
      position: relative;
      background-color: #e8e8e8;
      width: 359px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-top: 21px;
      .txt {
        position: absolute;
        top: 0px;
        width: 359px;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select: none;
        -ms-user-select: none;
        font-size: 12px;
        color: #999;
      }
      .movego {
        background-color: #22ac38;
        height: 40px;
        width: 0px;
      }
      .move {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 62px;
        height: 40px;
        border: 1px solid #ccc;
        cursor: move;
        border-radius: 4px;
        background: #fff;
      }
      .moveBefore {
        background: #fff url("../../assets/images/qj.png") no-repeat center;
      }
      .moveSuccess {
        background: #fff url("../../assets/images/yzcg.png") no-repeat center;
      }
    }
    button {
      width: 100%;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      background: #0e88e5;
      margin-top: 21px;
      cursor: pointer;
    }
    .footer {
      width: 100%;
      text-align: right;
      color: #0e88e5;
      font-size: 14px;
      margin-top: 21px;
      line-height: 25px;
      span {
        cursor: pointer;
      }
    }
  }
}
</style>