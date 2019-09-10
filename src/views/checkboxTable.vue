<template>
       <div>
           <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
              <legend>全选反选的表格</legend>
            </fieldset>
           <table class="layui-hide" id="demo" lay-filter="checkLabel"> </table>
            <div class="view-checkbox">
             <!-- <input type="checkbox"  v-model="checkboxTable"  class="campus view-input" @click="changeBtn">全选 -->
             <div class="layui-form view-box" @click="changeBtn">
                <input type="checkbox" name="checkboxTable" :value="checkboxTable" title="全选" lay-skin="primary"> 
                <span v-if="checkBoxTotal - unchecked.length>0">({{ checkBoxTotal- unchecked.length>0?checkBoxTotal- unchecked.length:'' }})条</span>
             </div>
            </div>
       </div>
</template>

<script>
// import { myTranferRecord } from '@/api/api'
export default {
  props: {

  },
  data() {
    return {
      tableData: [
        { id: 1, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 2, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 3, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 4, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 5, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 6, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 7, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 8, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 9, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 10, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 11, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 12, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 13, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 14, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 15, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 16, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 17, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 18, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 19, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 20, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 21, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 22, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 23, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
        { id: 24, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', LAY_CHECKED: false, LAY_TABLE_INDEX: 0 },
      ],
      currPage: 1,
      currTable: [],
      okcheck: [], //已选中列表
      unchecked: [],//未选中列表
      checkboxTable: false, //是否全选
      $: '',
      form: '',
      checkBoxTotal: 0, //已经选择的数据的条数
      total: 0  //一共有多少条数据
    };
  },
  created() {
    // this.getInit();
    this.total = this.tableData.length
  },
  mounted() {
    layui.use(['table', 'form', 'jquery'], () => {
      this.$ = layui.jquery
      this.form = layui.form
      this.tableInit(layui.table) //表格初始化
      this.listenCheckBox(layui.table, this.$) //监听表格复选框事件
    })
  },
  methods: {
    // 数据初始化
    getInit() {
      let params = {
        pageSize: 10,
        pageNum: 1,
      }
      myTranferRecord(params).then(res => {
        if (res.execCode == 'S') {
          this.tableData = res.content.list
        }
      })
    },
    tableInit(table) {
      table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        , even: true  //隔行换色
        , id: 'idTest'
        , cols: [[ //标题栏
          { type: 'checkbox' }
          , { field: 'id', title: '排序', width: 50, }
          , { field: 'name', title: '用户名', width: 80 }
          , { field: 'time', title: '出生日期', width: 120 }
          , { field: 'sex', title: '性别', sort: true }
          , { field: 'title', title: '爱好', minWidth: 160 }
          , { field: 'city', title: '城市', width: 100 }
          , { field: 'age', title: '年龄', width: 120 }
          , { field: 'love', title: '篮球', width: 120 }
        ]] //设置表头
        , data: this.tableData
        , page: true,
        total: 17,
        done: (res, curr, count) => {
          let currDataList = res.data
          this.currPage = curr //当前是第几页
          if (this.checkboxTable && this.checkBoxTotal - this.unchecked.length == this.total) {
            //选中条数等于总条数   全选
            currDataList.forEach((rows, index) => {
              rows.LAY_CHECKED = true;
              this.$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
              this.$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
              this.setCheckStatus(true)
            });
          } else if (this.checkboxTable && this.checkBoxTotal - this.unchecked.length < this.total) {
            this.setCheckStatus(true)
            this.tableData.forEach((rows, index) => {
              this.$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
              this.$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
              this.unchecked.forEach(item => {
                if (rows.id == item) {
                  for (let currPage = 1; currPage <= Math.ceil(this.tableData.length / 10); currPage++) {
                    if (index <= 9 && this.currPage == 1 && currPage == this.currPage) {
                      this.$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', false);
                      this.$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().removeClass('layui-form-checked');
                      this.setCheckStatus(false)
                      break;
                    } else if (index > (this.currPage - 1) * 9 && index < 10 * this.currPage && currPage != 1) {
                      let a = (index - 10 * (this.currPage - 1))
                      if (a >=0) {
                        this.$('.layui-table-body tr[data-index=' + a + '] input[type="checkbox"]').prop('checked', false);
                        this.$('.layui-table-body tr[data-index=' + a + '] input[type="checkbox"]').next().removeClass('layui-form-checked');
                        this.setCheckStatus(false)
                      }
                       break;
                    }
                  }
                }
              });
            });
          }
        }
      });
    },
    // 顶部全选按钮的状态
    setCheckStatus(status) {
      if (status) {
        this.$('.layui-table  tr th input[type="checkbox"]').prop('checked', true);
        this.$('.layui-table  tr th input[type="checkbox"]').next().addClass('layui-form-checked');
      } else {
        this.$('.layui-table  tr th input[type="checkbox"]').prop('checked', false);
        this.$('.layui-table  tr th input[type="checkbox"]').next().removeClass('layui-form-checked');
      }
    },
    // 监听复选框事件
    listenCheckBox(table, $) {
      table.on('checkbox(checkLabel)', (obj) => {
        const nowPageData = table.checkStatus('idTest').data  //当前页面选择的数据
        this.currTable = table.cache['idTest'] //当前页面一共有多少条数据
        console.log(nowPageData, this.currTable)
        switch (obj.type) {
          case 'one':   //选中某一行按钮
            this.clickRows(obj, table);
            break;
          case 'all': //全选按钮
            this.clickNowPages(nowPageData);
            break;
        }
      });
    },
    //点击某一行
    clickRows(obj, table) {
      if (this.checkboxTable) { //已经点击了全选的情况
        if (this.unchecked.length === 0) {  //真正的全选
          this.unchecked.push(obj.data.id);
        } else {//有部分手动取消的情况
          if (this.unchecked.indexOf(obj.data.id) == -1) {
            this.unchecked.push(obj.data.id);
          } else {
            this.unchecked.splice(this.unchecked.indexOf(obj.data.id), 1);
          }
        }

        if (this.unchecked.length == 0) { //依然是全选
          table.reload('idTest')
          this.checkboxTable = true;
          this.okcheck = [];
          this.unchecked = [];
          console.log('全选')
        } else if (this.unchecked.length == this.total) { //当手动取消的个数等于总数
          this.unchecked = [];
          this.okcheck = [];
          this.checkBoxTotal = 0;
          this.checkboxTable = false;
        }

      } else {//非全选
        if (this.okcheck.length == 0) {
          this.okcheck.push(obj.data.id);
        } else {
          if (this.okcheck.indexOf(obj.data.id) == -1) {
            this.okcheck.push(obj.data.id);
          } else {
            this.okcheck.splice(this.okcheck.indexOf(obj.data.id), 1);
          }
        }
        this.checkBoxTotal = this.okcheck.length;
        if (this.okcheck.length == this.total) {
          this.checkboxTable = true;
          this.okcheck = [];
          this.unchecked = [];
        }
      }
    },
    // 点击当前页面的全选按钮
    clickNowPages(nowPageData) {
      if (this.checkboxTable) {  //全选的状态
        if (!nowPageData.length) {  //当前页面无数据，则为取消
          this.currTable.forEach(item => {
            this.unchecked.push(item.id);
          });
        } else {
          this.currTable.forEach((item, i) => {
            this.unchecked.forEach((val, j) => {
              console.log(item.id, val)
              if (item.id == val) {
                this.unchecked.splice(j, 1);
              }
            });
          });
        }

        if (this.unchecked.length == this.total) {
          table.reload('idTest')
          //取消的等于总条数
          this.unchecked = [];
          this.okcheck = [];
          this.checkBoxTotal = 0;
          this.checkboxTable = false;
        } else if (this.unchecked.length == 0) {
          this.checkboxTable = true;
          this.$("input[name='checkboxTable']").prop('checked', true)
          this.form.render()
          this.unchecked = [];
          this.okcheck = [];
        }
      } else {//非全选
        if (nowPageData.length > 0) {
          nowPageData.forEach(item => {
            this.okcheck.push(item.id);
          });
        } else if (nowPageData.length == 0) {
          this.tableData.forEach(rows => {
            this.okcheck.forEach((item, index) => {
              if (rows.id == item) {
                this.okcheck.splice(index, 1);
              }
            });
          });
        }
        this.okcheck = this.unique(this.okcheck);
        this.checkBoxTotal = this.okcheck.length;
        if (this.checkBoxTotal == this.total) {
          this.okcheck = []
          this.unchecked = []
          this.checkboxTable = true;
          this.$("input[name='checkboxTable']").prop('checked', true)
          this.form.render()
        }
      }
    },
    // 全选所有数据
    changeBtn() {
      console.log(this.checkboxTable, this.unchecked)
      if (this.unchecked.length > 0) {  //说明点击全选之后 有 手动取消 然后再次点击  全选状态
        this.checkBoxTotal = this.total;
        this.checkboxTable = true;
        this.$("input[name='checkboxTable']").prop('checked', true)
        this.selectChecked();
        this.okcheck = [];
        this.unchecked = [];
        this.setCheckStatus(true)
      } else {
        if (!this.checkboxTable) { //全选
          this.checkBoxTotal = this.total;
          this.checkboxTable = true;
          this.$("input[name='checkboxTable']").prop('checked', true)
          this.selectChecked();
          this.okcheck = [];
          this.unchecked = [];
          this.setCheckStatus(true)
        } else {//全不选
          this.checkBoxTotal = 0;
          this.checkboxTable = false;
          this.$("input[name='checkboxTable']").prop('checked', false)
          this.notSelect();
          this.okcheck = [];
          this.unchecked = [];
          this.setCheckStatus(false)
        }
      }
      this.form.render()
    },
    // 全选
    selectChecked() {
      this.tableData.forEach((value, a) => {
        this.$('.layui-table tr[data-index=' + a + '] input[type="checkbox"]').prop('checked', true);
        this.$('.layui-table tr[data-index=' + a + '] input[type="checkbox"]').next().addClass('layui-form-checked');
      })
    },
    // 全不选
    notSelect() {
      this.tableData.forEach((value, a) => {
        this.$('.layui-table tr[data-index=' + a + '] input[type="checkbox"]').prop('checked', false);
        this.$('.layui-table tr[data-index=' + a + '] input[type="checkbox"]').next().removeClass('layui-form-checked');
      })
    },
    // 数组去重
    unique(arr) {
      return Array.from(new Set(arr));
    },
  }
};
</script>

<style scoped>
.view-checkbox {
  text-align: left;
}

.view-box {
  margin-left: 14px;
}
</style>
