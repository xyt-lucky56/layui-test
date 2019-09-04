<template>
   <div class="view-container">
      <div class="layui-container ">  
        <div class="layui-row">
            <div class="layui-col-md3 view-block" @click="getRole">
              <img src="../../assets/images/admin.png" alt="">
              <p class="view-name">管理员</p>
            </div>
            <div class="layui-col-md3 view-block"  style="margin:150px 20px" @click="getRole">
              <img src="../../assets/images/man.png" alt="">
              <p>普通用户1</p>
            </div>
             <div class="layui-col-md3 view-block">
              <img src="../../assets/images/woman.png" alt="" @click="getRole">
               <p> 普通用户2</p>
            </div>
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

    };
  },
  created() {

  },
  methods: {
    getRole() {
      this.$router.push('/admin/home')
    }
  }
};
</script>

<style scoped lang="less">
.view-container {
  width: 100%;
  height: 100%;
  background-color: #2f4056;
}
.view-block {
  background-color: #fff;
  border: 1px solid #eee;
  height: 400px;
  margin-top: 150px;
  box-shadow: 0 0px 5px #ccc;
  img {
    width: 100px;
    height: 100px;
    margin: 100px 0 20px 0;
  }
}
</style>
