<template>
    <div>
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
          <legend>列表懒加载</legend>
        </fieldset>
        <div class="site-demo-flow" id="LAY_demo3" style="height: 800px;overflow: auto;" >
            <table class="layui-hide" lay-filter="tableDemo" id="demo"></table>
        </div>
    </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      tableList: [
        { id: 1, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e3222222222222222222222222220', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
        { id: 2, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', status: 1 },
        { id: 3, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', status: 1 },
        { id: 4, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', status: 1 },
        { id: 5, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', status: 1 },
        { id: 6, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 7, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 8, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e3222222222222222222222222221', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
        { id: 9, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', status: 1 },
        { id: 10, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', status: 1 },
        { id: 11, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', status: 1 },
        { id: 12, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', status: 1 },
        { id: 13, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 14, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 1, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
        { id: 2, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', status: 1 },
        { id: 1, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
        { id: 2, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', status: 1 },
        { id: 1, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
      ],
    };
  },
  created() {

  },
  mounted() {
    layui.use(['table', 'form', 'flow'], () => {
      this.tableInit(layui.table) //表格初始化
      this.uploadTable(layui.table, layui.flow)
    })
  },
  methods: {
    tableInit(table) {
      table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        // , height: 315
        , limit: 300
        , cols: [[ //标题栏
          { field: 'name', title: '用户名', width: 80, fixed: 'left' }
          , { field: 'time', title: '出生日期', width: 120 }
          , { field: 'sex', title: '性别', sort: true }
          , { field: 'title', title: '爱好', minWidth: 160, style: 'background-color: pink;' }
          , { field: 'city', title: '城市', width: 100 }
          , { field: 'age', title: '年龄', width: 120 }
          , { field: 'love', title: '篮球', width: 120 }
          , {            field: 'status', title: '操作', width: 280, fixed: 'right', align: 'center',
          }
        ]] //设置表头
        , data: this.tableList
        , done: (res, curr, count) => {
        }
      });
    },
    uploadTable(table, flow) {
      flow.load({
        elem: '#LAY_demo3' //流加载容器
        , scrollElem: '#LAY_demo3'
        , isAuto: true
        , done: (page, next) => { //执行下一页的回调
          console.log('执行下一页')
          if (page == 1) {
            next()
          } else {
            setTimeout(() => {
              this.tableList.forEach(value => {
                this.tableList.push(value)
              });
              table.reload('demo', { // 调用table.reload 重新渲染显示加载追加了数据的表格
                data: this.tableList
              });
              next()
            }, 1000)
          }
        }
      });
    },
  }
};
</script>

<style scoped>
</style>
