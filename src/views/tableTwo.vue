<template>
    <div>
      <table class="layui-table">
        <colgroup>
          <col width="150">
          <col width="200">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>昵称</th>
            <th>加入时间</th>
            <th>签名</th>
          </tr> 
        </thead>
        <tbody>
          <tr>
            <td>贤心</td>
            <td>2016-11-29</td>
            <td>人生就像是一场修行</td>
          </tr>
          <tr>
            <td>许闲心</td>
            <td>2016-11-28</td>
            <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
          </tr>
          <tr>
            <td>许闲心</td>
            <td>2016-11-28</td>
            <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
          </tr>
       </tbody>
      </table>
    </div>
</template>

<script>
 
import {myTranferRecord} from '@/api/api'
export default {
  props: {

  },
  components: {  },
  data() {
    return {

    };
  },
  created() {
    this.getInit();
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
    //   分页
    changePage(data) {
      console.log(data, '数据')
    }
  }
};
</script>

<style scoped>
</style>

