<template>
  <div class="play-list">
    <div class="block-title">
      <span>全部歌单</span>
    </div>
    <div class="flexbox">
      <div  v-for=" item in playLists" class="flexbox-item">
        <!--点击跳转到歌单播放界面-->
        <router-link :to="{name: 'listdetail',params: { id: item.id, name: item.name, coverImgUrl: item.coverImgUrl, creator: item.creator, playCount: item.playCount }}">
          <div class="count">{{ item.playCount | countFormat }}</div>
          <img class="response" :src="item.coverImgUrl" alt="歌单封面">
          <div class="description"><div class="name">
            {{item.name}}
          </div></div>
        </router-link>
      </div>
    </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="getLists"/>
  </div>

</template>

<script>
  import api from '../api'
  const { getPlayListByWhere } = api;
  export default {
    name: 'playList',
    data () {
      return {
        playLists:[],
        loading: false,
        numLoaded: 0,
        scroller: null
      }
    },
    mounted(){
      this.getLists();
      this.scroller = document.documentElement;
    },
    methods: {
      getLists(){
        this.loading = true;
        this.$http.get(getPlayListByWhere('全部', 'hot', this.numLoaded, true, 6))
          .then((res) => {
            this.playLists = this.playLists.concat(res.data.playlists);
            this.numLoaded += 6;
            this.loading = false;
          })
      }
    },
    filters: {
      countFormat(count){
        if (typeof count !== 'number'){
          return
        }
        return count < 100000 ? count : (count / 10000).toFixed(0) + '万';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  .block-title{
    /*margin-top: 0.5em;*/
    color: #333;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    a{
      font-size: 16px;
      color: #333;
    }
    span{
      padding-left: 0.3rem;
      border-left: 2px solid #ce3d3e;
      /*&:after{*/
        /*margin-left: 0.5em;*/
        /*content: ">";*/
        /*color: #aaa;*/
      /*}*/
    }

  }

  .flexbox{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  /*单行省略*/
  .ellipsis(@row: 1) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /*多行省略*/
  .ellipsis(@row) when (@row > 1){
    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @row;
  }

  .flexbox-item{
    position: relative;
    flex-basis: 49%;
    margin-bottom: 1em;
    overflow: hidden;

    .count{
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0, 0, 0, 0.1);
    }
    /*响应式图片*/
    img{
      background: url('../../static/default_cover.png') no-repeat;
      background-size: cover;
    }
    .response{
      width: 100%;
      min-height: 5rem;
      height: auto;
    }
    /*封面描述*/
    .description{
      overflow: hidden;
      width: 100%;
      padding: 0 0.4em;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.87);
      .name{
        .ellipsis(2);
      }
      .mv-name,.author{
        height: 1.4em;
        .ellipsis;
      }

    }
  }
</style>
