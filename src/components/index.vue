<template>
  <div>
    <!--顶部固定菜单栏-->
    <div class="fixed-bar">
      <mu-appbar class="menu">
        <mu-icon-button icon="menu" slot="left"></mu-icon-button>
        <mu-icon-button icon="search" slot="right"></mu-icon-button>
      </mu-appbar>
      <!--选项卡-->
      <mu-tabs :value="activeTab" @change="changeTab" class="view-tabs">
        <mu-tab value="recommend" title="个性推荐"/>
        <mu-tab value="playlist" title="歌单"/>
        <mu-tab value="toplist" title="排行榜"/>
        <mu-tab value="hotsinger" title="热门歌手"/>
      </mu-tabs>
    </div>
    <!--主内容显示-->
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        activeTab: 'recommend'
      }
    },
    watch: {
      //tab跟随路由变化
      $route({path}, form) {
          let arr = path.toLocaleString().split('/');
          if (arr[1] == 'index'){
            this.changeTab(arr[2]);
          }
        }
    },
    computed: {
//      path(){
//          return this.$route.path;
//      }
    },
    methods: {
      changeTab(val){
        this.activeTab = val;
        //路由跳转
        this.$router.push(val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .fixed-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    .menu{
      height: 64px;
    }
  }
  .content{
    margin-top: 112px;
  }
</style>
