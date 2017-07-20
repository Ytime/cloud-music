<template>
  <div class="player-wrapper">
    <div class="player-bg"></div>
    <div class="player-mask">
      <mu-appbar  class="fixed-bar">
        <mu-icon-button icon="arrow_back" @click="$router.go(-1)" slot="left"></mu-icon-button>
        <div slot="default" class="info">
          <div class="name">{{player.name}}</div>
          <div class="artist">{{player.singer}}</div>
        </div>


        <mu-icon-button icon="share" slot="right"></mu-icon-button>
      </mu-appbar>
      <div class="hr"></div>

      <div class="play-cd" :class="{pause: !isPlaying}">
        <div class="play-cd-halo">
          <div class="cd-wrapper" id="cd-wrapper">
            <img class="cd-cover" :src="player.coverImgUrl" alt="">
          </div>

        </div>
      </div>

      <footer class="bottom-player" >

        <div class="">
          <!--播放进度-->
          <div class="process">
            <div class="process-bar-wrapper">
              <div class="cur-time" id="cur">{{currentTime | timeFormat}}</div>
              <div class="process-bar">
                <mu-slider class="slider" @change="changeTime" v-model="timeVal"/>
              </div>
              <div class="dur-time" id="total">{{durationTime | timeFormat}}</div>
            </div>
          </div>

          <!--播放控制板-->
          <div class="control">
            <button @click="changeMode" class="item mode" :class="modeClass"></button>
            <button @click="playPre" class="item previous"></button>
            <button @click="togglePlay" class="item play" :class="[isPlaying ? 'pause' : 'play']"></button>
            <button @click="playNext" class="item next"></button>
            <button @click="showList" class="item list"></button>
          </div>
        </div>

        <!--播放列表-->
        <!--<player-list></player-list>-->
      </footer>
    </div>

  </div>

</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  //去抖
  const deBounce = function(ms, func){
    let timer = null;
    return function () {
      let ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(ctx, args);
      }, ms)
    }
  };
  export default {
    name: 'player',
    data () {
      return {
        //缓冲时间
        bufTime: 0,
      }
    },
//    退出播放器，显示底部播放器
    beforeRouteLeave(to, from, next){
      this.CLOSE_PLAYER();
      next()

    },
    computed: {
      ...mapState(['isPlaying','player','audio', 'mode', 'currentTime', 'durationTime']),
      ...mapGetters(['playTime']),
      //切换播放模式样式
      modeClass: function () {
        return {
          'random-mode': this.mode == 1,
          'single-mode': this.mode == 2
        }
      },
      timeVal: function () {
        return this.playTime;
      }
    },
    methods: {
      ...mapGetters(['getSong']),
      ...mapActions(['playNext', 'playPre', 'changeMode', 'setPlayerTime']),
      ...mapMutations(['CLOSE_PLAYER','SHOW_PLAYER_LIST','PAUSE','PLAY', 'SET_PLAY_MODE']),
      //显示播放列表
      showList(){
        this.SHOW_PLAYER_LIST();
      },
      //播放暂停切换
      togglePlay(){
        if(this.isPlaying){
          this.PAUSE();
          this.audio.pause();
        }else{
          this.PLAY();
          this.audio.play();
        }
      },
      changeTime: deBounce(300, function (val) {
        if (val > 0);
        this.setPlayerTime(val / 100);
      })

    },
    filters: {
      timeFormat(time){
        if(isNaN(time)){
          return '00:00';
        }
        let min = Math.floor(time / 60),
            sec = Math.floor(time - min * 60);
        return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
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

  //播放器
  .player-wrapper, .player-bg, .player-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
  }
  .player-bg{
    width: 100%;
    height: 100%;
    background: url("http://p1.music.126.net/aao5Ku06P5PrMafCfT3MjQ==/18648816720698170.jpg?param=300y300") top right no-repeat;
    background-size: cover;
    filter: blur(30px);
  }
  .player-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 20, 20, 0.35);
  }
  .fixed-bar{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    transition: background 1s;
    background: rgba(206, 61, 62, 0);
    box-shadow: none;
    /*border-bottom: 1px solid #666;*/
    .info{
      /*float: left;*/

      line-height: 1.5;
      font-size: 18px;
      .name{
        .ellipsis;
        max-width: 12rem;
      }
      .artist{
        font-size: 12px;
        color: #a8a7a7;
      }
    }
  }
  .hr{
    width: 100%;
    height: 1px;
    background: radial-gradient(#d3d3d3 -90%, transparent 100%);
  }
  .play-cd{
    position: relative;
    overflow: hidden;
    height: 20rem;

    &:before{
      content: '';
      position: absolute;
      width: 4rem;
      height: 6rem;
      right: 30%;
      top: -.8rem;
      /*显示设置层叠顺序，避免被cd的旋转动画盖住*/
      z-index: 1;
      background: url("/static/stick_bg.png") no-repeat left top;
      background-size: cover;
      transition: all 300ms ease-in;
      transform-origin: left top;
      transform: rotate(0deg);
    }
    &.pause:before{
      transform: rotate(-15deg);
    }
    .play-cd-halo{
      /*position: absolute;*/
      width: 12rem;
      height: 12rem;
      padding: 0.1rem;

      background-color: rgba(107, 107, 107, 0.3);
      border-radius: 50%;
      margin: 3rem auto;
      .cd-wrapper{
        width: 100%;
        height: 100%;
        padding: 2rem;
        background: url("/static/cd_wrapper.png") center no-repeat;
        background-size: contain;
        animation-play-state: running;
        animation: rotating 20s linear .5s infinite;
        /*text-align: center;*/
        .cd-cover{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      /*top: 50%;*/
      /*left: 50%;*/
      /*<!--margin: -25% 0 0 -25%;-->*/


    }
    &.pause .cd-wrapper{
      animation-play-state: paused;
    }

  }

  .bottom-player{
    position: fixed;
    width: 100%;
    /*padding: 0 0.4rem;*/
    /*padding: 0.2rem;*/
    /*min-height: 3rem;*/
    bottom: 0;
    z-index: 99;
    .process{
      padding: 0 1rem;
      .process-bar-wrapper{
        position: relative;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        /*line-height: 24px;*/
      }
      /*.cur-time, .dur-time{*/
        /*!*display: inline-block;*!*/
      /*}*/
      .cur-time, .dur-time{
        width: 10%;
        /*height: 100%;*/
        position: absolute;
        top: 0;
        color: rgba(255,255,255,0.5);
        font-size: 12px;
        line-height: 24px;
      }
      .cur-time{
        left: 0;
      }
      .dur-time{
        right: 0;
        /*float: right;*/
      }
      .process-bar{
        width: 70%;
        margin: 0 auto;
        /*padding: 0 2.4rem;*/
      }


      .process-bar{

      }
    }
    .control{
      color: #fff;
      display: flex;
      /*height: 3rem;*/
      padding-bottom: 0.6rem;
      justify-content: space-around;
      align-items: center;

      .item{
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
        outline: 0;
        border: 0 none;
      }
      .mode{
        background: url("/static/loop_mode.png") center no-repeat ;
        background-size: contain;
      }
      .single-mode{
        background: url("/static/single_mode.png") center no-repeat ;
        background-size: contain;
      }
      .random-mode{
        background: url("/static/random_mode.png") center no-repeat ;
        background-size: contain;
      }
      .previous{
        background: url("/static/previous.png") center no-repeat ;
        background-size: contain;
      }
      .next{
        background: url("/static/next.png") center no-repeat ;
        background-size: contain;
      }
      .play, .pause{
        width: 1.8rem;
        height: 1.8rem;
        /*border-radius: 50%;*/
        /*flex-basis: 15%;*/
      }
      .play{
        background: url("/static/play.png") center no-repeat ;
        background-size: cover;
      }
      .pause{
        background: url("/static/pause.png") center no-repeat ;
        background-size: cover;
      }
      .list{
        background: url("/static/player_list.png") center no-repeat;
        background-size: contain;
      }

    }
  }
</style>
