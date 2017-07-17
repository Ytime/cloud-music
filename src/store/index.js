/**
 * Created by 风稻人 on 2017/7/15.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../api'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPlaying: false,
    isShow: false,
    // 播放器
    player: {
      //歌曲id
      id: 0,
      name: '歌曲名字',
      singer: '演唱者',
      coverImgUrl: '/static/placeholder_disk_play_program.png',
      src: ''
    },
    //播放列表
    playlist: []

  },
  getters:{
    //是否显示底部播放器
    isShowBar: state => {
      return state.playlist.length > 0
    }
  },
  mutations: {
    //播放音乐,如果有索引参数，表示切歌
    PLAY(state) {
      // console.log()
      state.isPlaying = true;
    },
    //暂停
    PAUSE(state){
      state.isPlaying = false;
    },
    //切换歌曲，设置新的歌曲id
    CHANGE_PLAY(state, index){
      // state.player.id = (state.playlist[index].id);
      console.log('commit CHANGE_PLAY')
      Vue.set(state.player, 'id', state.playlist[index].id);
    },
    //显示播放列表
    SHOW_PLAYER_LIST(state){
      state.isShow = true;
    },
    //关闭播放列表
    CLOSE_PLAYER_LIST(state){
      state.isShow = false;
    },

    //设置当前播放的参数
    SET_PLAYER(state, params){
      console.log('commit: SET_PLAYER');

      state.player = params;

    },
    SET_PLAYER_SRC(state, src){
      console.log('commit: SET_PLAYER_SRC')
      Vue.set(state.player, 'src', src);
    },

    //添加歌单全部歌曲到播放列表
    PLAY_ALL(state, list){
      console.log('commit: PLAY_ALL');
      state.playlist = list;
    },
    //在播放列表中删除某一首歌
    DELETE(state, index){
      console.log('commit: DELETE')
      if (typeof index === 'number'){
        state.playlist.splice(index, 1);
      }
    }
  },
  actions: {
    //设置player当前播放歌曲参数
    // setPlayer(params){
    //   "use strict";
    //
    // },
    //通过歌曲id获取歌曲
    getSong(context, id){
      console.log("action: getSong")
      Axios.get(api.getSong(id)).then( ({data}) => {
        if (data.code === 200){
          context.commit("SET_PLAYER_SRC", data.data[0].url);
        }
      }).catch( err => {
        console.log("failed to get song info");
        console.log(err);
      })

    },
    //重置player参数
    deleteSong(context, params){
      console.log('action: deleteSong');
      context.commit('SET_PLAYER', {
        //歌曲id
        id: 0,
        name: '歌曲名字',
        singer: '演唱者',
        coverImgUrl: '/static/placeholder_disk_play_program.png',
        src: ''
      });
      context.commit('DELETE', params)
    }
  }

})

