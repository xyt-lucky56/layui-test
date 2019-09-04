<template>
    <div class='view-form'>
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>表单</legend>
        </fieldset>
        <form class="layui-form" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">输入框</label>
            <div class="layui-input-block">
            <input type="text" name="title"  v-model="userName"  placeholder="请输入标题" autocomplete="off" class="layui-input"  lay-verify="userName" lay-verType="tips">
            </div> 
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">密码框</label>
            <div class="layui-input-inline">
            <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="off" class="layui-input" lay-verify="password" ref="password" lay-verType="tips">
            </div>
            <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">选择框</label>
            <div class="layui-input-block">
            <select name="city">
                <option value=""></option>
                <option value="0">北京</option>
                <option value="1">上海</option>
                <option value="2">广州</option>
                <option value="3">深圳</option>
                <option value="4">杭州</option>
            </select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">复选框</label>
            <div class="layui-input-block">
            <input type="checkbox" name="like[write]" title="写作">
            <input type="checkbox" name="like[read]" title="阅读" checked>
            <input type="checkbox" name="like[dai]" title="发呆">
            </div>
        </div>
      
        <div class="layui-form-item">
            <label class="layui-form-label">单选框</label>
            <div class="layui-input-block">
            <input type="radio" name="sex" value="男" title="男">
            <input type="radio" name="sex" value="女" title="女" checked>
            </div>
        </div>
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">文本域</label>
            <div class="layui-input-block">
            <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">联动选择框</label>
            <div class="layui-input-inline">
              <select name="quiz1"  lay-filter="formTest">
                <option value="">请选择省</option>
                <option v-for="(item,index) in chinaList" :key="index" :value="item.label">{{item.value}}</option>
              </select>
            </div>
            <div class="layui-input-inline" lay-filter="formTest1">
              <select name="quiz2" >
                <option value="">请选择市</option>
                <option v-for="(item,index) in cityList" :key="index" :value="item.label">{{item.value}}</option>
              </select>
            </div>
            <div class="layui-input-inline">
              <select name="quiz3">
                <option value="">请选择县/区</option>
                <option value="西湖区">西湖区</option>
                <option value="余杭区">余杭区</option>
                <option value="拱墅区">临安市</option>
              </select>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import { checkLegal } from '@/filter/regular'
import { chinaList } from '@/utils/city'
export default {
  props: {

  },
  data() {
    return {
      userName: '',
      password: '',
      chinaList: chinaList,
      cityList: []
    };
  },
  mounted() {
    layui.use(['form'], () => {
      const form = layui.form;
      form.render()
      this.formSubmit(form)
      this.checkForm(form)
      this.changeOptions(form)
    })
  },
  methods: {
    // 提交表单
    formSubmit(form) {
      form.on('submit(formDemo)', function (data) {
      });
    },
    // 省区市切换
    changeOptions(form) {
      form.on('select(formTest)', (data) => {
        this.chinaList.forEach((item, index) => {
          if (item.label == data.value) {
            this.cityList = item.childrens;
            this.$nextTick(() => {
              form.render('select');
            })
          }
        })
      });
    },
    // 表单验证规则
    checkForm(form) {   //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      form.verify({
        userName: [/\S/, '姓名一定不能为空'],
        password: (value) => {
          if (!/\S/.test(value)) {
            this.$refs.password.focus();
            return '原身份证不能为空';
          } else if (!checkLegal(value)) {
            this.$refs.password.focus();
            return '不符合身份证规则'
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.view-form {
  width: 50%;
  margin-top: 60px;
}
</style>
