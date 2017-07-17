<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player-bar></player-bar>
  </div>
</template>

<script>
//  import player from './components/player.vue'
  import playerBar from './components/playerBar.vue'
  export default {
    name: 'app',
    components: {
//      player,
      playerBar
    }
  }
</script>

<style lang="less">
  @import "./assets/theme.less";
  /*.player-list-wrapper{*/
    /*width: 100%;*/
    /*max-height: 60%;*/
  /*}*/
  .on{
    color: @primaryColor;
    /*display: none;*/
  }

</style>
