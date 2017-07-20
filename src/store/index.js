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
    //播放状态
    isPlaying: false,
    //播放列表
    isShow: false,
    //播放器页面
    isShowPlayer: false,
    //当前播放歌曲在列表中的位置（复用，如果为负，表示使用playHistory的数据）
    curIndex: 0,
    //记录随机模式播放历史，针对随机模式，playPre优先使用此记录的数据
    randomHistory: [],
    //播放模式 0：循环
    mode: 0,
    // 音乐参数
    player: {
      //歌曲id
      id: 0,
      name: '歌曲名字',
      singer: '演唱者',
      coverImgUrl: '/static/placeholder_disk_play_program.png',
      src: ''
    },
    //audio对象
    audio: null,
    //当前播放时间
    currentTime: 0,
    //总时间
    durationTime: 0,
    //播放列表
    playlist: []

  },
  getters:{
    //是否显示底部播放器
    isShowBar: state => {
      return !state.isShowPlayer && state.playlist.length > 0;
    },
    //播放百分比
    playTime: ({currentTime, durationTime}) => {
      let percent = currentTime / durationTime * 100;
      return isNaN(percent) ? 0 : percent;
    }
  },
  /**
   * mutations只负责简单的变量变更
   */
  mutations: {

    //设置audio
    SET_AUDIO(state, obj){
      state.audio = obj;
    },

    //播放音乐,如果有索引参数，表示切歌
    PLAY(state) {
      // console.log()
      state.isPlaying = true;
    },
    //暂停
    PAUSE(state){
      state.isPlaying = false;
    },
    // //切换歌曲，设置新的歌曲id 弃用
    // CHANGE_PLAY(state, index){
    //   Vue.set(state.player, 'id', state.playlist[index].id);
    // },
    //设置播放时间
    SET_CURRENT_TIME(state, time){
      state.currentTime = time;
    },
    //设置播放器的播放时间
    SET_PLAYER_TIME(state, time){
      state.audio.currentTime = time;
    },
    //设置总时间
    SET_DURATION_TIME(state, time){
      state.durationTime = time;
    },
    //设置播放模式
    SET_PLAY_MODE(state, mode){
      state.mode = mode;
    },
    //设置当前播放索引
    SET_PLAY_INDEX(state, index){
      // state.preIndex = state.curIndex;
      state.curIndex = index;
    },
    //推入随机播放历史栈
    PUSH_RANDOM_HISTORY({randomHistory, player}){
      if (randomHistory.length == 0){
        randomHistory.push(player);
      }
      else if (player.id != randomHistory[randomHistory.length - 1].id){
        randomHistory.push(player);
      }
    },
    UNSHIFT_RANDOM_HISTORY({randomHistory}, params){
      randomHistory.unshift(params);
    },
    //清空随机播放历史
    CLEAR_RANDOM_HISTORY(state){
      state.randomHistory = [];
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
      state.player = params;
    },
    SET_PLAYER_SRC(state, src){
      Vue.set(state.player, 'src', src);
    },
    SET_PLAYLIST_SRC(state, src){
      Vue.set(state.playlist, 'src', src);
    },
    //添加歌单全部歌曲到播放列表
    PLAY_ALL(state, list){
      state.playlist = list;
    },
    //在播放列表中删除某一首歌
    DELETE(state, index){
      if (typeof index === 'number'){
        state.playlist.splice(index, 1);
      }
    },
    //播放界面打开
    SHOW_PLAYER(state){
      state.isShowPlayer = true;
    },
    //播放界面关闭
    CLOSE_PLAYER(state){
      state.isShowPlayer = false;
    }
  },
  /**
   * 异步操作以及复杂的交互操作
   */
  actions: {
    //获取当前歌曲在播放列表的索引
    getIndex({state}){
      let playlist = state.playlist,
          id = state.player.id;
      for (let i = 0, len = playlist.length; i < len; i++){
        if (playlist[i].id == id){
          return i;
        }
      }
    },
    //通过歌曲id获取歌曲
    getSong(context, {id}){
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
    },
    //切换歌曲：设置当前播放音乐信息，并获取资源
    changeSong({commit, state}, index){
      let songParams;
      if (index >= 0){
        songParams = state.playlist[index];
      }else{
        songParams = state.randomHistory[state.randomHistory.length + index];
      }

      commit('SET_PLAY_INDEX', index);
      commit('SET_PLAYER', songParams);
      //如果还未获取src通过id请求歌曲资源
      if (!songParams.src){
        Axios.get(api.getSong(songParams.id))
          .then( ({data}) => {
            if (data.code === 200){
              let url = data.data[0].url;
              commit("SET_PLAYER_SRC", url);
              //请求过的也在playlist里面记录src，避免重复请求
              commit("SET_PLAYLIST_SRC", url);
            }
          })
          .catch( err => {
            console.log("failed to get song info");
            console.log(err);
          })
      }
    },
    // //圆周取模
    // circleAdd(context){
    //   "use strict";
    // },
    //切换播放模式
    changeMode({commit, dispatch, state}){
      let mode = state.mode;
      if (mode == 1){
        //退出随机模式，清空随机播放历史，重置当前播放索引为播放列表中索引
        commit('CLEAR_RANDOM_HISTORY');
        return dispatch('getIndex').then( index => {
          commit('SET_PLAY_INDEX', index);
          console.log('SET_PLAY_INDEX')
          commit('SET_PLAY_MODE', (mode + 1) % 3);
        })
      }
      console.log('SET_PLAY_MODE')
      commit('SET_PLAY_MODE', (mode + 1) % 3);
    },

    //下一首，如果使用了很多次上一首，playNext应该使用的是playHistory的数据
    playNext({dispatch, commit, state}, isAuto){
      let {curIndex, mode, playlist} = state,
          len = playlist.length;
      //随机模式，考虑播放历史
      if (mode == 1){
        //如果是播放历史的最后一首，使用新数据，为了不重复随机，应该先获取当前歌曲的真实索引
        if ( curIndex >= -1){
          curIndex = Math.ceil(Math.random() * (len -1)) % len;
          //随机模式，记录历史，当使用playPre时优先使用历史数据
          commit('PUSH_RANDOM_HISTORY');
        }
        //继续使用历史记录
        else{
          curIndex++;
        }
      }
      //正常模式切换到下一首。单曲循环模式，如果是手动切换，切换到播放列表中的下一首
      else{
        curIndex = (curIndex + 1) % len;
      }
      //切换新歌曲
      dispatch('changeSong', curIndex);
    },
    //上一首，随机模式下，上一首优先播放历史记录的歌曲，没有则使用随机播放
    playPre({dispatch, commit, state}){
      let {playlist, curIndex, mode} = state,
          len = playlist.length;
      //正常模式和单曲循环一样, 需要注意的是复数的圆周取模不一样
      if (mode == 0 || mode == 2){
        curIndex = curIndex == 0 ? len -1 : curIndex - 1;
      }
      //随机模式，考虑播放历史
      else if (mode == 1){
        if (curIndex >= 0){
          //记录当前播放歌曲
          commit('PUSH_RANDOM_HISTORY');
          curIndex = -2;
        }else{
          curIndex--;
        }
        let randomLen = state.randomHistory.length;
        // 上一首回退到尽头，可以随机播放新的歌曲，并从历史数组头部加入数组
        if (randomLen + curIndex < 0){
          //调用其他action返回值是一个promise，需要把最后的dispatch('changeSong', curIndex)放到then里面执行
          return dispatch('getIndex').then(index => {
            let randIndex = (index + Math.ceil(Math.random() * (len -1))) % len;
            commit('UNSHIFT_RANDOM_HISTORY', playlist[randIndex]);
            dispatch('changeSong', curIndex);
          })
        }
      }
      dispatch('changeSong', curIndex);
    },
    //设置播放时间
    setPlayerTime({commit, state}, percent){
      let time = percent * state.durationTime;
      if (time >= 0){
        commit('SET_CURRENT_TIME', time);
        commit('SET_PLAYER_TIME', time);
      }
    }

  }

})

