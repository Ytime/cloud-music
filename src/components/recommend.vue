<template>
  <div>
    <!--loding-->
    <div class="loading-wrapper" v-if="isLoading" >
      <div class="loading"></div>
      <div class="loading-txt">正在加载中</div>
    </div>

    <!--推荐内容-->
    <div class="container" v-show="!isLoading">

      <!--banner-->
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide><img src="/static/banner1.jpg" class="banner-item"  alt="banner"></swiper-slide>
        <swiper-slide><img src="/static/banner2.jpg" class="banner-item"  alt="banner"></swiper-slide>
        <swiper-slide><img src="/static/banner3.jpg" class="banner-item"  alt="banner"></swiper-slide>
        <swiper-slide><img src="/static/banner4.jpg" class="banner-item"  alt="banner"></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>

      <!--重写flexbox-->
      <div class="song-list">
        <div class="block-title">
          <span><router-link :to="{path: '/index/playlist'}">推荐歌单</router-link></span>
        </div>
        <div class="flexbox">
          <div  v-for=" item in playList" class="flexbox-item">
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
      </div>

      <div class="mv-list">
        <div class="block-title">
          <span><router-link :to="{path: '/index/songList'}">推荐MV</router-link></span>
        </div>
        <div class="flexbox">
          <div class="flexbox-item" v-for="item in mvList">
            <!--点击跳转到歌单播放界面-->
            <router-link to="/playlist/45">
              <div class="count">11万</div>
              <img class="response" src="http://p3.music.126.net/4yKLwestioAjiv_4Rhdbng==/19018252625830120.jpg?param=159y90" alt="歌单封面">
              <div class="description">
                <div class="mv-name">Yo Contigo, Tú Conmigo (The Gong Gong Song / El Tema De La Película "Gru 3 Mi Villano Favorito")</div>
                <div class="author">Morat/Alvaro Soler</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import api from  '../api'
  const { getPlayListByWhere } = api;

  export default {
    name: 'recommendation',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        // 正在加载中
        isLoading: true,
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true
        },
        //推荐歌单
        playList: [],
        //推荐mv
        mvList: [0,1]
      }
    },
    created(){
        this.$http(getPlayListByWhere('全部', 'hot', 0, true, 6)).then(res => {
            this.isLoading = false;
            this.playList = res.data.playlists;
        })
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


  /*banner*/
  .slider{
    min-height: 8.5rem;
  }
  .banner-item{
    width: 100%;
    min-height: 8.5rem;
    background: url('../../static/banner-item-load.png') no-repeat;
    background-size: cover;
  }
  /*加载tips*/
  .loading-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    width: 5rem;
    height: 5rem;
    margin: -2.5rem -2.5rem;
    text-align: center;
    .loading{
      width: 3rem;
      height: 3rem;
      margin: 0 auto;
      background: url('../../static/rage_loading.png') no-repeat;
      background-size: cover;
      animation: rotating 5s linear infinite;
    }
    .loading-txt{
      margin-top: 0.6em;
    }
  }

  //旋转图像
  @keyframes rotating {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .container{
    /*padding: 0 5px;*/
  }
  /*推荐歌单*/
  /*通用展示模块*/
  /*块标题*/
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
      &:after{
        margin-left: 0.5em;
        content: ">";
        color: #aaa;
      }
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
    flex-basis: 33%;
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

  .mv-list .flexbox-item{
    flex-basis: 49.5%;
  }
</style>
