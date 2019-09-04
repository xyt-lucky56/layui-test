<template>
   <div>
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
          <legend>上传文件</legend>
      </fieldset>
      <button type="button" class="layui-btn" id="test1">
         <i class="layui-icon">&#xe67c;</i>上传图片1
    </button>
   </div>
</template>

<script>
import UPLOADIMG from '@/utils/upload'
import { treeData } from '@/filter/groupList'
export default {
  props: {

  },
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {
    UPLOADIMG('test1', { scene: 'siteinfoedit' }).then(res => {
      console.log('成功123', res)
    }).catch(err => {
      err.upload();
      console.log('失败456', err)
    })
  },
  methods: {
  }
};
</script>
<style scoped>
</style>
