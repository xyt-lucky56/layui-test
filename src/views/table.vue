<template>
    <div class="view-table">
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>表格，直接用js渲染</legend>
      </fieldset>
      <!-- 头部检索 -->
      <div class="demoTable">
        <form class="layui-form">
            <div class="layui-form-item layui-inline">
              <label class="layui-form-label">姓名</label>
              <div class="layui-input-inline">
                <input type="name" name="name" required placeholder="请输入姓名" autocomplete="off" class="layui-input">
              </div>
            </div>
            <div class="layui-form-item layui-inline">
              <label class="layui-form-label">性别</label>
              <div class="layui-input-inline">
                <select name="sex">
                  <option value="">请选择性别</option>
                  <option value="0">女</option>
                  <option value="1">男</option>
                </select>
              </div>
              <div class="layui-form-item layui-inline">
                <div class="layui-input-block">
                  <button class="layui-btn" lay-submit lay-filter="formDemo">搜索</button>
                  <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                </div>
              </div>
          </div>
        </form>
      </div>
      <!-- 表格主题 -->
      <table class="layui-hide" id="demo" lay-filter="tableDemo" >
        <div id="barDemo"  v-pre> 
            {{#  if(d.status == 1){ }}
            <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
             {{#  } else if(d.status == 2) { }}
            <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
            {{#  } else { }}
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
            {{#  } }}
        </div>
        <div id='sexTpl' v-pre >
            {{#  if(d.name == '贤心1'){ }}
            <span style='background:red'>{{d.name}}</span>  
             {{#  } else if(d.name =='贤心2') { }}
            <span style='background:yellow'>{{d.name}}</span>  
            {{#  } else { }}
            <span>{{d.name}}</span>  
            {{#  } }}
        </div>
      </table>
    </div>
</template>
<script>
export default {
  props: {

  },
  data() {
    return {
      tableList: [
        { id: 1, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
        { id: 2, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', status: 2 },
        { id: 3, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', status: 1 },
        { id: 4, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', status: 1 },
        { id: 5, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', status: 3 },
        { id: 6, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 7, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 8, name: '贤心1', time: '2016-11-29', sex: 1, title: '人生就像是一场修行e322222222222222222222222222', city: '武汉', age: 30, love: '篮球', operate: '查看', status: 1 },
        { id: 9, name: '贤心2', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 301, love: '篮球', operate: '查看', status: 1 },
        { id: 10, name: '贤心3', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 302, love: '篮球', operate: '查看', status: 1 },
        { id: 11, name: '贤心4', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 303, love: '篮球', operate: '查看', status: 1 },
        { id: 12, name: '贤心5', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 309, love: '篮球', operate: '查看', status: 1 },
        { id: 13, name: '贤心6', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
        { id: 14, name: '贤心7', time: '2016-11-29', sex: 1, title: '人生就像是一场修行', city: '武汉', age: 308, love: '篮球', operate: '查看', status: 1 },
      ],
    };
  },
  created() {
  },
  mounted() {
    layui.use(['table', 'form','jquery'], () => {
      this.$=layui.jquery;
      this.tableInit(layui.table, this.$) //表格初始化
      this.editorBtn(layui.table) // 监听表格操作按钮
      this.searchForm(layui.form)// 条件检索
      this.listenSort(layui.table)
    })
  },
  methods: {
    tableInit(table,$) {
      table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        , even: true  //隔行换色
        , cols: [[ //标题栏
          { field: 'name', title: '用户名', width: 80, fixed: 'left',templet:"#sexTpl" }
          , { field: 'time', title: '出生日期', width: 120 }
          , { field: 'sex', title: '性别', sort: true }
          , { field: 'title', title: '爱好', minWidth: 160, style: 'background-color: pink;' }
          , { field: 'city', title: '城市', width: 100 }
          , { field: 'age', title: '年龄', width: 120 }
          , { field: 'love', title: '篮球', width: 120 }
          , {field: 'status', title: '操作', width: 280, fixed: 'right', align: 'center', toolbar: '#barDemo'
            , templet: function (d) {
              return d
            }          }
        ]] //设置表头
        , data: this.tableList
        , page: true,
        done: (res, curr, count) => {
          let list=res.data;
          list.forEach((item,index)=>{
             if(item.name=="贤心3"){
               this.$(`.layui-border-box .layui-table-body tr[data-index='${index}']>td[data-content='${item.name}']`).css('background','blue')
               this.$(`.layui-border-box .layui-table-body tr[data-index='${index}']>td[data-field='city']`).css('background','red')
               }else if(item.name=='贤心7'){
                this.$(`.layui-border-box .layui-table-body tr[data-index='${index}']`).css('background','yellow')
             }
          })
          // console.log('现在数据渲染完成',res)
          //  console.log('现在数据渲染完成',curr)
          //   console.log('现在数据渲染完成',count)
        }
      });
    },
    // 监听表格操作按钮
    editorBtn(table) {
      table.on('tool(tableDemo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
          layer.msg('ID：' + data.name + ' 的查看操作');
        } else if (obj.event === 'del') {
          layer.confirm('真的删除行么', function (index) {
            obj.del();
            layer.close(index);
          });
        } else if (obj.event === 'edit') {
          layer.alert('编辑行：<br>' + JSON.stringify(data))
        }
      });
    },
    // 监听排序事件
    listenSort(table) {
      table.on('sort(tableDemo)', function (obj) {
        console.log(obj,'排序')
      });
    },
    // 条件检索
    searchForm(form) {
      form.render()
      //监听提交
      form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
      });
    }
  }
};
</script>


<style scoped>
.view-box {
  width: 300px;
  height: 300px;
  background-color: brown;
  color: #fff;
}

.view-box1 {
  width: 300px;
  height: 300px;
  background-color: burlywood;
  color: #fff;
}

.view-table {
  width: 65%;
}
</style>

