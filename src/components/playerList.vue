<template>
  <mu-bottom-sheet :sheetClass="['player-list-wrapper']" :open="isShow" @close="close">
    <mu-sub-header class="list-header">
      播放列表 <span>({{playlist.length}})</span>
    </mu-sub-header>
    <mu-divider/>

    <mu-list class="list-content">
      <div  v-for="(item, index) in playlist" >
        <mu-list-item @click="change(index)" :titleClass="{'on': item.id == id}"  :title="item.name + ' - ' + item.singer">
          <!--<mu-icon class="on" v-if="item.id == id" value="volume_up" slot="left"></mu-icon>-->
          <mu-icon value="clear" @click="delSong($event, index)" slot="right"></mu-icon>
        </mu-list-item>
        <mu-divider/>
      </div>
    </mu-list>

  </mu-bottom-sheet>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'playerList',
    data () {
      return {

      }
    },
    computed: {
      ...mapState(['isShow', 'playlist']),
      ...mapState({
        id: state => state.player.id
      })
    },
    methods: {
      ...mapMutations(['CHANGE_PLAY', 'DELETE', 'SET_PLAYER']),
      ...mapActions(['deleteSong', 'changeSong']),
      close () {
        this.$store.commit('CLOSE_PLAYER_LIST');
      },
      //从播放列表中删除
      delSong(event, index){
        event.cancelBubble = true;
        this.deleteSong(index);
      },
      //切换歌曲
      change(index){
        if(this.id === this.playlist[index].id){
          //同一首歌，跳转播放页面
          this.$store.commit('CLOSE_PLAYER_LIST');
          this.$router.push({'name': 'player'});
        }
        else{
          this.changeSong(index)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/theme.less";
  .list-content{
    max-height: 14rem;
    padding-top: 0;
    /*height: 100%;*/
  }
  .list-item{
    color: @primaryColor;
  }
  .on{
    color: @primaryColor;
    /*display: none;*/
  }

</style>
