<template>
    <div>
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>锚点链接</legend>
      </fieldset>
      <div class="view-li view-handle" v-for="(item,index) in tableData" :key="index" @click="jump('#anchor'+index)">
        <span>星期{{index}}</span>
        <div class="view-hidden" id="top1" v-if="index == 0">我是星期二</div>
      </div>
      <div>
        <div class="main_con" id="anchor1">
          一周有七天
        </div>
        <div class="main_con" id="anchor1">
        我是星期一
        </div>
        <div class="main_con" id="anchor2">我是星期二</div>
        <div class="main_con" id="anchor3">我是星期三
          <div class="view-handle" @click="jump('#top1')">回到顶部</div>
        </div>
        <div class="main_con" id="anchor4">我是星期四
          <div class="view-handle" @click="jump('#top1')">回到顶部</div>
        </div>
        <div class="main_con" id="anchor5">我是星期五
          <div class="view-handle" @click="jump('#top1')">回到顶部</div>
        </div>
        <div class="main_con" id="anchor6">我是星期六
          <div class="view-handle" @click="jump('#top1')">回到顶部</div>
        </div>
        <div class="main_con" id="anchor7">
          我是星期天
            <div class="view-handle" @click="jump('#top1')">回到顶部</div>
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
      tableData: ['星期1', '星期2', '星期3', '星期4', '星期5', '星期6', '星期7']
    };
  },
  created() {

  },
  methods: {
    jump(name) {
      console.log( this.$el.querySelector(name))
      if (name == '#top1') {
        this.$el.querySelector(name).scrollIntoView(true)
      } else {
        this.$el.querySelector(name).scrollIntoView(false)
      }
    }
  }
};
</script>

<style scoped>
.list {
  width: 100%;
  height: 50px;
}
.view-li {
  width: 11%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #ccc;
  color: #ff6c00;
}
.main_con {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  line-height: 200px;
  text-align: center;
  color: blue;
}

.view-hidden{
  visibility: hidden;
}

.view-handle{
  cursor: pointer;
}
</style>

