<template>
  <div :class="{'show-mini-player': isShowBar}">
    <!--歌单封面-->
    <div class="cover">
      <!--返回导航条-->
      <mu-appbar :class="{'active': isActive}" class="fixed-bar">
        <mu-icon-button icon="arrow_back" @click="$router.go(-1)" slot="left"></mu-icon-button>
        <span>{{isActive? name : '歌单'}}</span>
        <mu-icon-button icon="search" slot="right"></mu-icon-button>
      </mu-appbar>
      <!--封面背景-->
      <div class="cover-bg"  :style="{'background-image':'url(' + coverImgUrl + ')'}" >
      </div>
      <!--加一层遮罩-->
      <div class="cover-mask">
        <!--封面配图-->
        <div class="cover-img">
          <img class="" :src="coverImgUrl" alt="">
          <div class="play-count">{{playCount | countFormat}}</div>
        </div>
        <!--歌单名字和用户名-->
        <div class="list-info">
          <p class="name">{{name}}</p>
          <p class="user">
            <mu-avatar slot="left"  :src="creator.avatarUrl" :size="30" :iconSize="20"/>
            <span class="user-name">{{creator.nickname}}</span>
          </p>
        </div>
      </div>

    </div>
    <div class="container">


      <!--歌单列表-->
      <div class="play-all">
        <!--<mu-icon value="play_circle_outline"/>-->

        <!--<mu-flat-button label="" class="demo-flat-button">-->
          <!--<div><mu-icon value="play_circle_outline"/><span class="">(共{{tracks.length}}首)</span></div>-->
        <!--</mu-flat-button>-->
        <!--<mu-flat-button label="播放全部" class="demo-flat-button" icon="play_circle_outline" primary/>-->
        <mu-flat-button label="播放全部" class="play-all-btn" icon="play_circle_outline" @click="playAll(0)"/>
        <span class="">(共{{tracks.length}}首)</span>

        <mu-divider/>
      </div>
      <!--loding-->
      <div class="loading-wrapper" v-if="isLoading" >
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
      </div>

      <mu-list class="track-list" v-if="!isLoading">
        <div v-for="(item, index) in tracks">
          <mu-list-item @click="playAll(index)"  :title="item.name" :describeLine="1" :describeText="item.ar[0].name + ' - ' + item.al.name">
            <span v-if="item.id !== songId" slot="left" class="">{{index + 1}}</span>
            <!--<span v-if="item.id !== songId" slot="left" class=""></span>-->
            <mu-icon class="on" v-else value="volume_up" slot="left"></mu-icon>
            <mu-icon value="more_vert" slot="right"></mu-icon>
          </mu-list-item>

          <mu-divider inset/>
        </div>
      </mu-list>

    </div>
  </div>


</template>

<script>

  import api from '../api';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  let {getPlayListDetail} = api;
  export default {
    components: {},
    name: 'playListDetail',
    data () {
      return {
        isActive: 0,
        navOpacity: 0,
        name: '歌单标题',
        coverImgUrl: '../../static/default_cover.png',
        playCount: 0,
        //歌单创建者
        creator: {
          avatarUrl: '../../static/user-default.png',
          nickname: '昵称'
        },
        //歌单id，判断是否需要重新获取歌单
        id: -1,
        //歌单中的歌曲
        tracks: [],
        isLoading: true
      }
    },
    //通过路由的导航钩子更新
    beforeRouteEnter({params}, from, next){
      //不能通过this访问实例，由回调函数参数vm访问组件实例
      //this.get()
      next(vm => {

        //如果歌单id与当前的id不符合，则重新加载数据
        if (parseInt(params.id) !== vm.id){
          vm.get()
        }
        //如果路由传递的参数带有歌单信息，直接使用加快显示速度
        if (params.coverImgUrl){
          vm.id = params.id;
          vm.name = params.name;
          vm.coverImgUrl = params.coverImgUrl;
          vm.playCount = params.playCount;
          vm.creator = params.creator;
        }
//        document.addEventListener('scroll', vm.scrollHandle, false);
//        window.onscroll = vm.scrollHandle

        window.addEventListener('scroll', vm.scrollHandle, false);
      })
    },
    //离开路由的操作，离开路由时，播放列表可能是打开状态
//    beforeRouteLeave(to, from, next){
//      window.removeEventListener('scroll', this.scrollHandle, false);
//      next();
//    },
    computed: {
      //获取当前播放歌曲的id
      songId(){
          return this.$store.state.player.id;
      },
      ...mapGetters(['isShowBar'])
    },
    methods: {
      ...mapMutations(['PLAY_ALL','CHANGE_PLAY', 'SET_PLAYER','PAUSE']),
      ...mapActions(['changeSong']),
      get(){
        this.isLoading = true;
        console.log('get: ' + this.$route.params.id)
        this.$http.get(getPlayListDetail(this.$route.params.id)).then(res => {
          let list = res.data.playlist;
          this.isLoading = false;
          this.tracks = list.tracks;
          this.id = list.id;
          this.name = list.name;
          this.coverImgUrl = list.coverImgUrl;
          this.playCount = list.playCount;
          this.creator = {avatarUrl: list.creator.avatarUrl, nickname: list.creator.nickname};
        })
      },
      //页面滚动事件处理
      scrollHandle(){
        let scrollOffset = window.pageYOffset;
        if (scrollOffset >= parseInt(document.documentElement.style.fontSize) * 6){
          this.isActive = 1;
        }else{
          this.isActive = 0;
        }
      },
      //根据api提供的信息，返回歌曲主要参数，属性与store的player对应
      getSongParams(item){
        return {
          id: item.id,
          name: item.name,
          coverImgUrl: item.al.picUrl,
          singer: item.ar[0].name,
          //url默认为空，需要get请求
          src: ''
        };
      },
      //播放全部，并从index开始播放。会重置playlist，并默认从第一首开始。
      // 点击同一个歌单任意歌曲，只要不是同一首，切换歌曲
      playAll(index = 0){
        //先判断当前播放歌曲是否在当前歌单
        let tracks = this.tracks;
        if(tracks.map(item => item.id).indexOf(this.songId) == -1){
          //不在当前歌单中，更换歌单
          let list = this.tracks.map( item => this.getSongParams(item) );
          this.PLAY_ALL(list);
        }

        if(this.songId === tracks[index].id){
          //同一首歌，跳转播放页面
          this.$router.push({'name': 'player'})
        }
        else{
          //切换歌曲
          this.changeSong(index);
//          this.playSong(index);
        }
      },
//      //播放音乐，先根据playlist设置封面和歌曲信息，再通过get方法请求歌曲文件
//      playSong(index){
//        let params = this.getSongParams(this.tracks[index]);
//        this.SET_PLAYER(params);
//        this.$store.dispatch('getSong', params)
//      }
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


  /*单行省略*/
  .ellipsis(@row: 1) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /*多行省略*/
  .ellipsis(@row) when (@row > 1){
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @row;
  }
  //显示底部播放器，歌单列表需要错开播放器高度
  .show-mini-player{
    margin-bottom: 2.4rem;
  }
  .cover{
    position: relative;
    width: 100%;
    min-height: 10rem;
  }
  .cover-bg, .cover-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .cover-bg{
    width: 100%;
    height: 100%;
    background-image: url("http://p1.music.126.net/aao5Ku06P5PrMafCfT3MjQ==/18648816720698170.jpg?param=300y300");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: cover;
    /*z-index: -1;*/
    filter: blur(30px);
  }
  .cover-mask{
    background-color: rgba(0, 0, 0, 0.35);
    padding: 64px 0 0 0.5rem;
    .cover-img{
      float: left;
      position: relative;
      width: 6rem;
      img{
        width: 100%;
        height: auto;
      }
      .play-count{
        font-size: 12px;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        width: 100%;
        text-align: right;
        padding: 2px 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }

    }
    .list-info{
      float: left;
      width: 7.5rem;
      margin-left: 1rem;
      color: #fff;
      .name{
        .ellipsis(2)
      }
      .user-name{
        display: inline-block;
        width: 5.4rem;
        .ellipsis();
        vertical-align: top;
        line-height: 30px;
      }
    }
  }
  .fixed-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    transition: background 0.5s;
    background: rgba(206, 61, 62, 0);
    box-shadow: none;
  }
  .fixed-bar.active{
    //考虑动态获取封面图片的主色，
    background: rgba(206, 61, 62, 1);
  }
  .container{
    position: relative;
    background: #fafafa;;
  }
  .play-all-btn{

    vertical-align: middle;
    & + span{
      color: rgba(0, 0, 0, 0.54);
    }
  }
  /*加载tips*/
  .loading-wrapper{
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*z-index: 5;*/
    width: 5rem;
    height: 5rem;
    margin: 20% auto;
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
    //旋转图像
    /*@keyframes rotating {*/
      /*0%{*/
        /*transform: rotate(0deg);*/
      /*}*/
      /*100%{*/
        /*transform: rotate(360deg);*/
      /*}*/
    /*}*/
    .track-list{
      background-color: #fafafa;
    }
  }
</style>
