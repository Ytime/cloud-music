<template>
  <div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="get"/>
    <p>{{text}}</p>
    <h2 class="tips">还没做完(╥╯^╰╥)</h2>
  </div>

</template>

<script>
  export default {
    name: 'topList',
    data () {
      return {
        loading: true,
        scroller: null,
        text: ''
      }
    },
    created(){
      this.scroller = document.documentElement;
      let that = this;
      setTimeout(function () {
        that.text = '热门歌手';
        that.loading = false;
      }, 1000)
    },
    methods: {
      get(){
        return;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tips{
    text-align: center;
    color: #fff;
  }
</style>
