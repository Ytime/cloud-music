<template>
  <footer class="bottom-player" v-show="isShowBar">
    <audio id="player" :src="player.src"  @canplay="canPlay" @error="loadError" @timeupdate="timeUpdate"></audio>
    <div class="cover" @click="showPlayer">
      <img :src="player.coverImgUrl" alt="">
    </div>
    <div class="info">
      <div>{{player.name}}</div>
      <div class="artist">{{player.singer}}</div>
    </div>
    <div class="control">

      <!--<mu-icon-button icon="play_circle_outline" class="control-btn play_circle_outline" />-->
      <!--<mu-icon-button icon="playlist_play" class="control-btn playlist_play" />-->
      <mu-icon-button class="control-btn" @click="togglePlay">
        <i class="icon material-icons">{{isPlaying ? 'pause_circle_outline' : 'play_circle_outline'}}</i>
      </mu-icon-button>
      <mu-icon-button class="control-btn" @click="showList">
        <i class="icon material-icons">playlist_play</i>
      </mu-icon-button>

    </div>

    <!--播放进度-->
    <mu-linear-progress :size="1" class="progress" mode="determinate" :value="value"/>

    <!--播放列表-->
    <player-list></player-list>
  </footer>

</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import playerList from './playerList.vue'

  export default {
    name: 'playerBar',
    components: {
      playerList
    },
    data () {
      return {
        audio: null,
        value: 0,
        bottomSheet: false,
        value: 0
      }
    },
    mounted(){
      this.audio = document.getElementById('player');
//      console.log(this.audio)
    },
    computed: {
      ...mapState(['isPlaying','player']),
      ...mapGetters(['isShowBar'])
    },
    methods: {

      ...mapMutations(['PLAY', 'PAUSE','SHOW_PLAYER_LIST']),
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
      //audio的canplay事件
      canPlay(){
        console.log('can play')
        this.PLAY();
        this.audio.play();
      },
      //audio加载出错回调函数
      loadError(){
        if (this.audio.currentSrc){
          console.log('歌曲路径不存在');
        }
      },
      //播放时间更新
      timeUpdate(){
        let curTime = this.audio.currentTime;
//        console.log(curTime)
        this.value = curTime / this.audio.duration * 100;
      },
      //显示播放列表
      showList(){
        this.SHOW_PLAYER_LIST();
      },
      //显示播放器
      showPlayer(){
        this.$router.push({name:'player'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bottom-player{
    position: fixed;
    width: 100%;
    padding: 0.2rem;
    height: 2.4rem;
    bottom: 0;
    z-index: 99;
    background: #fff;

    .cover{
      float: left;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      float: left;
      padding: 0.1rem 0.2rem;
      font-size: 0.6rem;
      .artist{
        color: rgba(0, 0, 0, 0.54);
      }

    }
    .control{
      float: right;
      /*line-height: 2.4rem;*/
      /*padding: 0.1rem 0.2rem;*/
      /* font-size: 1rem; */
      height: 100%;
      .control-btn{
        width: 2rem;
        height: 2rem;
        padding: 2px;
        .icon{
          font-size: 1.2rem;
        }

      }
    }
    .progress{
      background-color: #fff;
    }


  }
</style>
