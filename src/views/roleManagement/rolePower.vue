<template>
    <div class="subsystem">
        <h1>权限分配</h1>
        <div class="content">
            <div id="test1" class="demo-tree-more"></div>
            <div class="layui-input-block submit">
                <div class="layui-btn addbtn" @click="subPower">确定</div>
                <div class="layui-btn layui-btn-primary addbtn" @click="goback">取消</div>
            </div>
        </div>       
    </div>
</template>

<script>
import { queryRolePermissions, assignRolePermissions } from '@/api/api'
export default {
  props: {
  },
  data() {
    return {
      id: '',
      systemname: '',
      formData: [],
      roleList: [],
      tree: null,
    };
  },
  created() {
    if(this.$route.params.id){
      this.id = this.$route.params.id;
      this.systemname = this.$route.params.systemname;
      this.getPowers();
    }
  },
  methods: {
    // 获取权限
    getPowers(){
      let parmas = {
        id: this.id,
        systemname: this.systemname
      }
      queryRolePermissions(parmas).then(res => {
        if(res.code === 0){                            
          var list = res.data.list;
          var treeData = [];
          for(let i = 0; i < list.length; i++){
            let menuone = list[i];
            let obj1 = {};
            obj1.id = menuone.groupId;
            obj1.title = menuone.groupname;
            obj1.children = []; 
            if(menuone.sysPowerinfo.length){
              for(let a = 0; a < menuone.sysPowerinfo.length; a++){
                let menutwo = menuone.sysPowerinfo[a];
                let obj2 = {};
                obj2.id = menutwo.powerId;
                obj2.title = menutwo.powername;
                obj1.children.push(obj2);
              } 
            }
            treeData.push(obj1);
          }
          this.formData = treeData;

          if(res.data.roleList.length){
            var list1 = res.data.roleList, roleList=[];
            for(let i = 0; i < list1.length; i++){
              let menuone = list1[i];
              if(menuone.sysPowerinfo.length){
                for(let a = 0; a < menuone.sysPowerinfo.length; a++){
                  let menutwo = menuone.sysPowerinfo[a];
                  roleList.push(menutwo.powerId)
                } 
              }
            }
            console.log(roleList);
            this.roleList = roleList;
          }
          
          this.showTree();
        }else{
          this.$message.warning(res.msg);
        }
      })
    },

    // //渲染树形组件
    showTree() {
      layui.use('tree', () => {
        var tree = layui.tree;
        this.tree = layui.tree;
        tree.render({
          elem: '#test1',   //绑定元素
          id: 'demoId1',
          data: this.formData,
          showCheckbox: true,
        });

        tree.setChecked('demoId1', this.roleList); 
      });
      
    },
    
    subPower() {
      var checkData = this.tree.getChecked('demoId1');
      console.log(checkData);
      var list = [];
      for(let i = 0; i < checkData.length; i++){
        let menuone = checkData[i];
        if(menuone.children.length){
          for(let a = 0; a < menuone.children.length; a++){
            let menutwo = menuone.children[a];
            list.push(menutwo.id);
          } 
        }else{
          list.push(menuone.id);     
        }
      }
      console.log(list);
      let params = {
        roleId: this.id,
        powerIds: list
      }
      assignRolePermissions(params).then(res => {
        if(res.code === 0){
          this.$message.success('权限分配成功')       
          setTimeout(() => {
            this.$router.push({name: 'roleManagement'});
          },1000)          
        }else{
            this.$message.warning(res.msg);
        }
      })
    },
    goback(){
        this.$router.back(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.subsystem{
    width: 80%;
    text-align: center;
    h1{
        margin-top: 50px;
    }
    .content{
        margin: 20px; 
        .demo-tree-more{
            width: 200px;
            padding-top: 20px;
            margin: 0 auto;
            text-align: left;
        }
        .submit{
            margin-left: 50px;
            padding-top: 30px;
        }       
    }
}
</style>