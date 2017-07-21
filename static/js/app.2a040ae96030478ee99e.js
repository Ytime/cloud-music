webpackJsonp([1],[,,,,function(t,e,i){"use strict";var a="http://musicapi.duapp.com/api.php";e.a={getPlayListByWhere:function(t,e,i,n,s){return a+"?type=topPlayList&cat="+t+"&offset="+i+"&limit="+s},getPlayListDetail:function(t){return"https://api.imjad.cn/cloudmusic/?type=playlist&id="+t},getSong:function(t){return a+"?type=url&id="+t}}},,,,,,,,function(t,e,i){"use strict";var a=i(3),n=i(2),s=i(11),o=i.n(s),r=i(4);a.default.use(n.e),e.a=new n.e.Store({state:{isPlaying:!1,isShow:!1,isLoadingSRC:!1,isShowPlayer:!1,curIndex:0,randomHistory:[],mode:0,player:{id:0,name:"歌曲名字",singer:"演唱者",coverImgUrl:"/static/placeholder_disk_play_program.png",src:""},audio:null,currentTime:0,durationTime:0,playlist:[]},getters:{isShowBar:function(t){return!t.isShowPlayer&&t.playlist.length>0},playTime:function(t){var e=t.currentTime,i=t.durationTime,a=e/i*100;return isNaN(a)?0:a}},mutations:{SET_AUDIO:function(t,e){t.audio=e},START_LOADING_SRC:function(t){t.isLoading=!0},STOP_LOADING_SRC:function(t){t.isLoading=!1},PLAY:function(t){t.isPlaying=!0},PAUSE:function(t){t.isPlaying=!1},SET_CURRENT_TIME:function(t,e){t.currentTime=e},SET_PLAYER_TIME:function(t,e){t.audio.currentTime=e},SET_DURATION_TIME:function(t,e){t.durationTime=e},SET_PLAY_MODE:function(t,e){t.mode=e},SET_PLAY_INDEX:function(t,e){t.curIndex=e},PUSH_RANDOM_HISTORY:function(t){var e=t.randomHistory,i=t.player;0==e.length?e.push(i):i.id!=e[e.length-1].id&&e.push(i)},UNSHIFT_RANDOM_HISTORY:function(t,e){t.randomHistory.unshift(e)},CLEAR_RANDOM_HISTORY:function(t){t.randomHistory=[]},SHOW_PLAYER_LIST:function(t){t.isShow=!0},CLOSE_PLAYER_LIST:function(t){t.isShow=!1},SET_PLAYER:function(t,e){t.player=e},SET_PLAYER_SRC:function(t,e){a.default.set(t.player,"src",e)},SET_PLAYLIST_SRC:function(t,e){a.default.set(t.playlist,"src",e)},PLAY_ALL:function(t,e){t.playlist=e},DELETE:function(t,e){"number"==typeof e&&t.playlist.splice(e,1)},SHOW_PLAYER:function(t){t.isShowPlayer=!0},CLOSE_PLAYER:function(t){t.isShowPlayer=!1}},actions:{getIndex:function(t){for(var e=t.state,i=e.playlist,a=e.player.id,n=0,s=i.length;n<s;n++)if(i[n].id==a)return n},getSong:function(t,e){var i=t.context,a=t.commit,n=t.state,s=e.id,l=o.a.CancelToken,c=l.source();n.isLoadingSRC&&n.playlist.length>0&&(console.log("cancel"),c.cancel()),a("START_LOADING_SRC"),o.a.get(r.a.getSong(s)).then(function(t){var e=t.data;200===e.code&&(a("STOP_LOADING_SRC"),i.commit("SET_PLAYER_SRC",e.data[0].url))}).catch(function(t){console.log("failed to get song info"),console.log(t)})},deleteSong:function(t,e){console.log("action: deleteSong"),t.commit("SET_PLAYER",{id:0,name:"歌曲名字",singer:"演唱者",coverImgUrl:"/static/placeholder_disk_play_program.png",src:""}),t.commit("DELETE",e)},changeSong:function(t,e){var i=t.commit,a=t.state,n=void 0;n=e>=0?a.playlist[e]:a.randomHistory[a.randomHistory.length+e],i("SET_PLAY_INDEX",e),i("SET_PLAYER",n),n.src||o.a.get(r.a.getSong(n.id)).then(function(t){var e=t.data;if(200===e.code){var a=e.data[0].url;i("SET_PLAYER_SRC",a),i("SET_PLAYLIST_SRC",a)}}).catch(function(t){console.log("failed to get song info"),console.log(t)})},changeMode:function(t){var e=t.commit,i=t.dispatch,a=t.state,n=a.mode;if(1==n)return e("CLEAR_RANDOM_HISTORY"),i("getIndex").then(function(t){e("SET_PLAY_INDEX",t),console.log("SET_PLAY_INDEX"),e("SET_PLAY_MODE",(n+1)%3)});console.log("SET_PLAY_MODE"),e("SET_PLAY_MODE",(n+1)%3)},playNext:function(t,e){var i=t.dispatch,a=t.commit,n=t.state,s=n.curIndex,o=n.mode,r=n.playlist,l=r.length;1==o?s>=-1?(s=Math.ceil(Math.random()*(l-1))%l,a("PUSH_RANDOM_HISTORY")):s++:s=(s+1)%l,i("changeSong",s)},playPre:function(t){var e=t.dispatch,i=t.commit,a=t.state,n=a.playlist,s=a.curIndex,o=a.mode,r=n.length;if(0==o||2==o)s=0==s?r-1:s-1;else if(1==o){s>=0?(i("PUSH_RANDOM_HISTORY"),s=-2):s--;var l=a.randomHistory.length;if(l+s<0)return e("getIndex").then(function(t){var a=(t+Math.ceil(Math.random()*(r-1)))%r;i("UNSHIFT_RANDOM_HISTORY",n[a]),e("changeSong",s)})}e("changeSong",s)},setPlayerTime:function(t,e){var i=t.commit,a=t.state,n=e*a.durationTime;n>=0&&(i("SET_CURRENT_TIME",n),i("SET_PLAYER_TIME",n))}}})},,,,,,,,,,,,function(t,e,i){"use strict";var a=i(3),n=i(125),s=i(12);a.default.use(n.a),e.a=new n.a({routes:[{path:"/",redirect:"/index"},{path:"/index",name:"index",component:i(105),children:[{path:"/index",redirect:"/index/recommend"},{path:"recommend",component:i(111)},{path:"playlist",component:i(106)},{path:"topList",component:i(112)},{path:"hotSinger",component:i(104)}]},{path:"/playlist/:id",name:"listdetail",component:i(107)},{path:"/player",name:"player",component:i(108),beforeEnter:function(t,e,i){s.a.commit("SHOW_PLAYER"),i()}}]})},function(t,e){},function(t,e){},,,function(t,e,i){function a(t){i(97)}var n=i(1)(i(49),i(123),a,null,null);t.exports=n.exports},,,,,,,,,,,,,,,,,,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"swiper-slide",data:function(){return{slideClass:"swiper-slide"}},ready:function(){this.update()},mounted:function(){this.update(),this.$parent.options.slideClass&&(this.slideClass=this.$parent.options.slideClass)},updated:function(){this.update()},attached:function(){this.update()},methods:{update:function(){this.$parent&&this.$parent.swiper&&this.$parent.swiper.update&&(this.$parent.swiper.update(!0),this.$parent.options.loop&&this.$parent.swiper.reLoop())}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a="undefined"!=typeof window;a&&(window.Swiper=i(23),i(88)),e.default={name:"swiper",props:{options:{type:Object,default:function(){return{autoplay:3500}}}},data:function(){return{defaultSwiperClasses:{wrapperClass:"swiper-wrapper"}}},ready:function(){!this.swiper&&a&&(this.swiper=new Swiper(this.$el,this.options))},mounted:function(){var t=this,e=function(){if(!t.swiper&&a){delete t.options.notNextTick;var e=!1;for(var i in t.defaultSwiperClasses)t.defaultSwiperClasses.hasOwnProperty(i)&&t.options[i]&&(e=!0,t.defaultSwiperClasses[i]=t.options[i]);var n=function(){t.swiper=new Swiper(t.$el,t.options)};e?t.$nextTick(n):n()}};this.options.notNextTick?e():this.$nextTick(e)},updated:function(){this.swiper&&this.swiper.update()},beforeDestroy:function(){this.swiper&&(this.swiper.destroy(),delete this.swiper)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(109),n=i.n(a);e.default={name:"app",components:{playerBar:n.a}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hotSinger",data:function(){return{loading:!0,scroller:null,text:""}},created:function(){this.scroller=document.documentElement;var t=this;setTimeout(function(){t.text="热门歌手",t.loading=!1},1e3)},methods:{get:function(){}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"index",data:function(){return{activeTab:"recommend"}},watch:{$route:function(t,e){var i=t.path,a=i.toLocaleString().split("/");"index"==a[1]&&this.changeTab(a[2])}},computed:{},methods:{changeTab:function(t){this.activeTab=t,this.$router.push(t)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(4),n=a.a.getPlayListByWhere;e.default={name:"playList",data:function(){return{playLists:[],loading:!1,numLoaded:0,scroller:null}},mounted:function(){this.getLists(),this.scroller=document.documentElement},methods:{getLists:function(){var t=this;this.loading=!0,this.$http.get(n("全部","hot",this.numLoaded,!0,6)).then(function(e){t.playLists=t.playLists.concat(e.data.playlists),t.numLoaded+=6,t.loading=!1})}},filters:{countFormat:function(t){if("number"==typeof t)return t<1e5?t:(t/1e4).toFixed(0)+"万"}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(5),n=i.n(a),s=i(4),o=i(2),r=s.a.getPlayListDetail;e.default={components:{},name:"playListDetail",data:function(){return{isActive:0,navOpacity:0,name:"歌单标题",coverImgUrl:"../../static/default_cover.png",playCount:0,creator:{avatarUrl:"../../static/user-default.png",nickname:"昵称"},id:-1,tracks:[],isLoading:!0}},beforeRouteEnter:function(t,e,i){var a=t.params;i(function(t){parseInt(a.id)!==t.id&&t.get(),a.coverImgUrl&&(t.id=a.id,t.name=a.name,t.coverImgUrl=a.coverImgUrl,t.playCount=a.playCount,t.creator=a.creator),window.addEventListener("scroll",t.scrollHandle,!1)})},computed:n()({songId:function(){return this.$store.state.player.id}},i.i(o.b)(["isShowBar"])),methods:n()({},i.i(o.d)(["PLAY_ALL","CHANGE_PLAY","SET_PLAYER","PAUSE"]),i.i(o.c)(["changeSong"]),{get:function(){var t=this;this.isLoading=!0,console.log("get: "+this.$route.params.id),this.$http.get(r(this.$route.params.id)).then(function(e){var i=e.data.playlist;t.isLoading=!1,t.tracks=i.tracks,t.id=i.id,t.name=i.name,t.coverImgUrl=i.coverImgUrl,t.playCount=i.playCount,t.creator={avatarUrl:i.creator.avatarUrl,nickname:i.creator.nickname}})},scrollHandle:function(){window.pageYOffset>=6*parseInt(document.documentElement.style.fontSize)?this.isActive=1:this.isActive=0},getSongParams:function(t){return{id:t.id,name:t.name,coverImgUrl:t.al.picUrl,singer:t.ar[0].name,src:""}},playAll:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=this.tracks;if(-1==i.map(function(t){return t.id}).indexOf(this.songId)){var a=this.tracks.map(function(e){return t.getSongParams(e)});this.PLAY_ALL(a)}this.songId===i[e].id?this.$router.push({name:"player"}):this.changeSong(e)}}),filters:{countFormat:function(t){if("number"==typeof t)return t<1e5?t:(t/1e4).toFixed(0)+"万"}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(5),n=i.n(a),s=i(2);e.default={name:"player",data:function(){return{bufTime:0}},beforeRouteLeave:function(t,e,i){this.CLOSE_PLAYER(),i()},computed:n()({},i.i(s.a)(["isPlaying","player","audio","mode","currentTime","durationTime"]),i.i(s.b)(["playTime"]),{modeClass:function(){return{"random-mode":1==this.mode,"single-mode":2==this.mode}},timeVal:function(){return this.playTime}}),methods:n()({},i.i(s.b)(["getSong"]),i.i(s.c)(["playNext","playPre","changeMode","setPlayerTime"]),i.i(s.d)(["CLOSE_PLAYER","SHOW_PLAYER_LIST","PAUSE","PLAY","SET_PLAY_MODE"]),{showList:function(){this.SHOW_PLAYER_LIST()},togglePlay:function(){this.isPlaying?(this.PAUSE(),this.audio.pause()):(this.PLAY(),this.audio.play())},changeTime:function(t,e){var i=null;return function(){var a=this,n=arguments;clearTimeout(i),i=setTimeout(function(){e.apply(a,n)},t)}}(300,function(t){this.setPlayerTime(t/100)})}),filters:{timeFormat:function(t){if(isNaN(t))return"00:00";var e=Math.floor(t/60),i=Math.floor(t-60*e);return(e<10?"0"+e:e)+":"+(i<10?"0"+i:i)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(5),n=i.n(a),s=i(2),o=i(110),r=i.n(o);e.default={name:"playerBar",components:{playerList:r.a},data:function(){return{audio:null,bottomSheet:!1}},mounted:function(){this.audio=document.getElementById("player"),this.SET_AUDIO(this.audio)},computed:n()({},i.i(s.a)(["isPlaying","player","mode"]),i.i(s.b)(["isShowBar","playTime"])),methods:n()({},i.i(s.c)(["playNext","setPlayerTime"]),i.i(s.d)(["PLAY","PAUSE","SHOW_PLAYER_LIST","SET_AUDIO","SET_CURRENT_TIME","SET_DURATION_TIME"]),{togglePlay:function(){this.isPlaying?(this.PAUSE(),this.audio.pause()):(this.PLAY(),this.audio.play())},canPlay:function(){this.PLAY(),this.audio.play()},autoPlay:function(){2===this.mode?this.setPlayerTime(0):this.playNext()},loadError:function(){this.audio.currentSrc||console.log("歌曲路径不存在")},timeUpdate:function(){var t=this.audio.currentTime,e=this.audio.duration;this.SET_CURRENT_TIME(t),this.SET_DURATION_TIME(e)},showList:function(){this.SHOW_PLAYER_LIST()},showPlayer:function(){this.$router.push({name:"player"})}})}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(5),n=i.n(a),s=i(2);e.default={name:"playerList",data:function(){return{}},computed:n()({},i.i(s.a)(["isShow","playlist"]),i.i(s.a)({id:function(t){return t.player.id}})),methods:n()({},i.i(s.d)(["CHANGE_PLAY","DELETE","SET_PLAYER"]),i.i(s.c)(["deleteSong","changeSong"]),{close:function(){this.$store.commit("CLOSE_PLAYER_LIST")},delSong:function(t,e){t.cancelBubble=!0,this.deleteSong(e)},change:function(t){this.id===this.playlist[t].id?(this.$store.commit("CLOSE_PLAYER_LIST"),this.$router.push({name:"player"})):this.changeSong(t)}})}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(101),n=(i.n(a),i(4)),s=n.a.getPlayListByWhere;e.default={name:"recommendation",components:{swiper:a.swiper,swiperSlide:a.swiperSlide},data:function(){return{isLoading:!0,swiperOption:{pagination:".swiper-pagination",paginationClickable:!0},playList:[],mvList:[0,1]}},created:function(){var t=this;this.$http(s("全部","hot",0,!0,6)).then(function(e){t.isLoading=!1,t.playList=e.data.playlists})},filters:{countFormat:function(t){if("number"==typeof t)return t<1e5?t:(t/1e4).toFixed(0)+"万"}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"topList",data:function(){return{loading:!0,scroller:null,text:""}},created:function(){this.scroller=document.documentElement;var t=this;setTimeout(function(){t.text="热门歌手",t.loading=!1},1e3)},methods:{get:function(){}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(3),n=i(29),s=i.n(n),o=i(24),r=i(11),l=i.n(r),c=i(28),u=i.n(c),d=i(25),p=(i.n(d),i(12)),m=i(26),v=(i.n(m),i(27)),f=i.n(v);document.addEventListener("DOMContentLoaded",function(){f.a.attach(document.body)},!1),a.default.config.productionTip=!1,a.default.use(u.a),a.default.prototype.$http=l.a,new a.default({el:"#app",router:o.a,store:p.a,template:"<App/>",components:{App:s.a}})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e,i){var a=i(1)(i(47),i(119),null,null,null);t.exports=a.exports},function(t,e,i){var a=i(1)(i(48),i(121),null,null,null);t.exports=a.exports},function(t,e,i){function a(t){i(98)}var n=i(1)(i(50),i(124),a,"data-v-fc0a11ea",null);t.exports=n.exports},function(t,e,i){function a(t){i(95)}var n=i(1)(i(51),i(120),a,"data-v-57987b98",null);t.exports=n.exports},function(t,e,i){function a(t){i(94)}var n=i(1)(i(52),i(118),a,"data-v-48db3380",null);t.exports=n.exports},function(t,e,i){function a(t){i(91)}var n=i(1)(i(53),i(115),a,"data-v-25f36d1e",null);t.exports=n.exports},function(t,e,i){function a(t){i(89)}var n=i(1)(i(54),i(113),a,"data-v-05484e6f",null);t.exports=n.exports},function(t,e,i){function a(t){i(96)}var n=i(1)(i(55),i(122),a,"data-v-91767458",null);t.exports=n.exports},function(t,e,i){function a(t){i(92)}var n=i(1)(i(56),i(116),a,"data-v-267fbea6",null);t.exports=n.exports},function(t,e,i){function a(t){i(93)}var n=i(1)(i(57),i(117),a,"data-v-2e089fc4",null);t.exports=n.exports},function(t,e,i){function a(t){i(90)}var n=i(1)(i(58),i(114),a,"data-v-1aa5b9f5",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"player-wrapper"},[i("div",{staticClass:"player-bg"}),t._v(" "),i("div",{staticClass:"player-mask"},[i("mu-appbar",{staticClass:"fixed-bar"},[i("mu-icon-button",{attrs:{icon:"arrow_back"},on:{click:function(e){t.$router.go(-1)}},slot:"left"}),t._v(" "),i("div",{staticClass:"info",slot:"default"},[i("div",{staticClass:"name"},[t._v(t._s(t.player.name))]),t._v(" "),i("div",{staticClass:"artist"},[t._v(t._s(t.player.singer))])]),t._v(" "),i("mu-icon-button",{attrs:{icon:"share"},slot:"right"})],1),t._v(" "),i("div",{staticClass:"hr"}),t._v(" "),i("div",{staticClass:"play-cd",class:{pause:!t.isPlaying}},[i("div",{staticClass:"play-cd-halo"},[i("div",{staticClass:"cd-wrapper",attrs:{id:"cd-wrapper"}},[i("img",{staticClass:"cd-cover",attrs:{src:t.player.coverImgUrl,alt:""}})])])]),t._v(" "),i("footer",{staticClass:"bottom-player"},[i("div",{},[i("div",{staticClass:"process"},[i("div",{staticClass:"process-bar-wrapper"},[i("div",{staticClass:"cur-time",attrs:{id:"cur"}},[t._v(t._s(t._f("timeFormat")(t.currentTime)))]),t._v(" "),i("div",{staticClass:"process-bar"},[i("mu-slider",{staticClass:"slider",on:{change:t.changeTime},model:{value:t.timeVal,callback:function(e){t.timeVal=e},expression:"timeVal"}})],1),t._v(" "),i("div",{staticClass:"dur-time",attrs:{id:"total"}},[t._v(t._s(t._f("timeFormat")(t.durationTime)))])])]),t._v(" "),i("div",{staticClass:"control"},[i("button",{staticClass:"item mode",class:t.modeClass,on:{click:t.changeMode}}),t._v(" "),i("button",{staticClass:"item previous",on:{click:t.playPre}}),t._v(" "),i("button",{staticClass:"item play",class:[t.isPlaying?"pause":"play"],on:{click:t.togglePlay}}),t._v(" "),i("button",{staticClass:"item next",on:{click:t.playNext}}),t._v(" "),i("button",{staticClass:"item list",on:{click:t.showList}})])])])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("mu-infinite-scroll",{attrs:{scroller:t.scroller,loading:t.loading},on:{load:t.get}}),t._v(" "),i("p",[t._v(t._s(t.text))]),t._v(" "),i("h2",{staticClass:"tips"},[t._v("还没做完(╥╯^╰╥)")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:{"show-mini-player":t.isShowBar}},[i("div",{staticClass:"cover"},[i("mu-appbar",{staticClass:"fixed-bar",class:{active:t.isActive}},[i("mu-icon-button",{attrs:{icon:"arrow_back"},on:{click:function(e){t.$router.go(-1)}},slot:"left"}),t._v(" "),i("span",[t._v(t._s(t.isActive?t.name:"歌单"))]),t._v(" "),i("mu-icon-button",{attrs:{icon:"search"},slot:"right"})],1),t._v(" "),i("div",{staticClass:"cover-bg",style:{"background-image":"url("+t.coverImgUrl+")"}}),t._v(" "),i("div",{staticClass:"cover-mask"},[i("div",{staticClass:"cover-img"},[i("img",{attrs:{src:t.coverImgUrl,alt:""}}),t._v(" "),i("div",{staticClass:"play-count"},[t._v(t._s(t._f("countFormat")(t.playCount)))])]),t._v(" "),i("div",{staticClass:"list-info"},[i("p",{staticClass:"name"},[t._v(t._s(t.name))]),t._v(" "),i("p",{staticClass:"user"},[i("mu-avatar",{attrs:{src:t.creator.avatarUrl,size:30,iconSize:20},slot:"left"}),t._v(" "),i("span",{staticClass:"user-name"},[t._v(t._s(t.creator.nickname))])],1)])])],1),t._v(" "),i("div",{staticClass:"container"},[i("div",{staticClass:"play-all"},[i("mu-flat-button",{staticClass:"play-all-btn",attrs:{label:"播放全部",icon:"play_circle_outline"},on:{click:function(e){t.playAll(0)}}}),t._v(" "),i("span",{},[t._v("(共"+t._s(t.tracks.length)+"首)")]),t._v(" "),i("mu-divider")],1),t._v(" "),t.isLoading?i("div",{staticClass:"loading-wrapper"},[i("div",{staticClass:"loading"}),t._v(" "),i("div",{staticClass:"loading-txt"},[t._v("正在加载中")])]):t._e(),t._v(" "),t.isLoading?t._e():i("mu-list",{staticClass:"track-list"},t._l(t.tracks,function(e,a){return i("div",[i("mu-list-item",{attrs:{title:e.name,describeLine:1,describeText:e.ar[0].name+" - "+e.al.name},on:{click:function(e){t.playAll(a)}}},[e.id!==t.songId?i("span",{slot:"left"},[t._v(t._s(a+1))]):i("mu-icon",{staticClass:"on",attrs:{value:"volume_up"},slot:"left"}),t._v(" "),i("mu-icon",{attrs:{value:"more_vert"},slot:"right"})],1),t._v(" "),i("mu-divider",{attrs:{inset:""}})],1)}))],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("mu-bottom-sheet",{attrs:{sheetClass:["player-list-wrapper"],open:t.isShow},on:{close:t.close}},[i("mu-sub-header",{staticClass:"list-header"},[t._v("\n    播放列表 "),i("span",[t._v("("+t._s(t.playlist.length)+")")])]),t._v(" "),i("mu-divider"),t._v(" "),i("mu-list",{staticClass:"list-content"},t._l(t.playlist,function(e,a){return i("div",[i("mu-list-item",{attrs:{titleClass:{on:e.id==t.id},title:e.name+" - "+e.singer},on:{click:function(e){t.change(a)}}},[i("mu-icon",{attrs:{value:"clear"},on:{click:function(e){t.delSong(e,a)}},slot:"right"})],1),t._v(" "),i("mu-divider")],1)}))],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.isLoading?i("div",{staticClass:"loading-wrapper"},[i("div",{staticClass:"loading"}),t._v(" "),i("div",{staticClass:"loading-txt"},[t._v("正在加载中")])]):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"container"},[i("swiper",{ref:"mySwiper",attrs:{options:t.swiperOption}},[i("swiper-slide",[i("img",{staticClass:"banner-item",attrs:{src:"/static/banner1.jpg",alt:"banner"}})]),t._v(" "),i("swiper-slide",[i("img",{staticClass:"banner-item",attrs:{src:"/static/banner2.jpg",alt:"banner"}})]),t._v(" "),i("swiper-slide",[i("img",{staticClass:"banner-item",attrs:{src:"/static/banner3.jpg",alt:"banner"}})]),t._v(" "),i("swiper-slide",[i("img",{staticClass:"banner-item",attrs:{src:"/static/banner4.jpg",alt:"banner"}})]),t._v(" "),i("div",{staticClass:"swiper-pagination",slot:"pagination"})],1),t._v(" "),i("div",{staticClass:"song-list"},[i("div",{staticClass:"block-title"},[i("span",[i("router-link",{attrs:{to:{path:"/index/playlist"}}},[t._v("推荐歌单")])],1)]),t._v(" "),i("div",{staticClass:"flexbox"},t._l(t.playList,function(e){return i("div",{staticClass:"flexbox-item"},[i("router-link",{attrs:{to:{name:"listdetail",params:{id:e.id,name:e.name,coverImgUrl:e.coverImgUrl,creator:e.creator,playCount:e.playCount}}}},[i("div",{staticClass:"count"},[t._v(t._s(t._f("countFormat")(e.playCount)))]),t._v(" "),i("img",{staticClass:"response",attrs:{src:e.coverImgUrl,alt:"歌单封面"}}),t._v(" "),i("div",{staticClass:"description"},[i("div",{staticClass:"name"},[t._v("\n              "+t._s(e.name)+"\n            ")])])])],1)}))]),t._v(" "),i("div",{staticClass:"mv-list"},[i("div",{staticClass:"block-title"},[i("span",[i("router-link",{attrs:{to:{path:"/index/songList"}}},[t._v("推荐MV")])],1)]),t._v(" "),i("div",{staticClass:"flexbox"},t._l(t.mvList,function(e){return i("div",{staticClass:"flexbox-item"},[i("router-link",{attrs:{to:"/playlist/45"}},[i("div",{staticClass:"count"},[t._v("11万")]),t._v(" "),i("img",{staticClass:"response",attrs:{src:"http://p3.music.126.net/4yKLwestioAjiv_4Rhdbng==/19018252625830120.jpg?param=159y90",alt:"歌单封面"}}),t._v(" "),i("div",{staticClass:"description"},[i("div",{staticClass:"mv-name"},[t._v('Yo Contigo, Tú Conmigo (The Gong Gong Song / El Tema De La Película "Gru 3 Mi Villano Favorito")')]),t._v(" "),i("div",{staticClass:"author"},[t._v("Morat/Alvaro Soler")])])])],1)}))])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"play-list"},[t._m(0),t._v(" "),i("div",{staticClass:"flexbox"},t._l(t.playLists,function(e){return i("div",{staticClass:"flexbox-item"},[i("router-link",{attrs:{to:{name:"listdetail",params:{id:e.id,name:e.name,coverImgUrl:e.coverImgUrl,creator:e.creator,playCount:e.playCount}}}},[i("div",{staticClass:"count"},[t._v(t._s(t._f("countFormat")(e.playCount)))]),t._v(" "),i("img",{staticClass:"response",attrs:{src:e.coverImgUrl,alt:"歌单封面"}}),t._v(" "),i("div",{staticClass:"description"},[i("div",{staticClass:"name"},[t._v("\n          "+t._s(e.name)+"\n        ")])])])],1)})),t._v(" "),i("mu-infinite-scroll",{attrs:{scroller:t.scroller,loading:t.loading},on:{load:t.getLists}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"block-title"},[i("span",[t._v("全部歌单")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.slideClass},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"fixed-bar"},[i("mu-appbar",{staticClass:"menu"},[i("mu-icon-button",{attrs:{icon:"menu"},slot:"left"}),t._v(" "),i("mu-icon-button",{attrs:{icon:"search"},slot:"right"})],1),t._v(" "),i("mu-tabs",{staticClass:"view-tabs",attrs:{value:t.activeTab},on:{change:t.changeTab}},[i("mu-tab",{attrs:{value:"recommend",title:"个性推荐"}}),t._v(" "),i("mu-tab",{attrs:{value:"playlist",title:"歌单"}}),t._v(" "),i("mu-tab",{attrs:{value:"toplist",title:"排行榜"}}),t._v(" "),i("mu-tab",{attrs:{value:"hotsinger",title:"热门歌手"}})],1)],1),t._v(" "),i("div",{staticClass:"content"},[i("keep-alive",[i("router-view")],1)],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"swiper-container"},[t._t("parallax-bg"),t._v(" "),i("div",{class:t.defaultSwiperClasses.wrapperClass},[t._t("default")],2),t._v(" "),t._t("pagination"),t._v(" "),t._t("button-prev"),t._v(" "),t._t("button-next"),t._v(" "),t._t("scrollbar")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",{directives:[{name:"show",rawName:"v-show",value:t.isShowBar,expression:"isShowBar"}],staticClass:"bottom-player"},[i("audio",{attrs:{id:"player",src:t.player.src},on:{canplay:t.canPlay,error:t.loadError,timeupdate:t.timeUpdate,ended:t.autoPlay}}),t._v(" "),i("div",{staticClass:"cover",on:{click:t.showPlayer}},[i("img",{attrs:{src:t.player.coverImgUrl,alt:""}})]),t._v(" "),i("div",{staticClass:"info"},[i("div",{staticClass:"name"},[t._v(t._s(t.player.name))]),t._v(" "),i("div",{staticClass:"artist"},[t._v(t._s(t.player.singer))])]),t._v(" "),i("div",{staticClass:"control"},[i("mu-icon-button",{staticClass:"control-btn",on:{click:t.togglePlay}},[i("i",{staticClass:"icon material-icons"},[t._v(t._s(t.isPlaying?"pause_circle_outline":"play_circle_outline"))])]),t._v(" "),i("mu-icon-button",{staticClass:"control-btn",on:{click:t.showList}},[i("i",{staticClass:"icon material-icons"},[t._v("playlist_play")])])],1),t._v(" "),i("mu-linear-progress",{staticClass:"progress",attrs:{size:1,mode:"determinate",value:t.playTime}}),t._v(" "),i("player-list")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("keep-alive",[i("router-view")],1),t._v(" "),i("player-bar")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("mu-infinite-scroll",{attrs:{scroller:t.scroller,loading:t.loading},on:{load:t.get}}),t._v(" "),i("p",[t._v(t._s(t.text))]),t._v(" "),i("h2",{staticClass:"tips"},[t._v("还没做完(╥╯^╰╥)")])],1)},staticRenderFns:[]}}],[59]);
//# sourceMappingURL=app.2a040ae96030478ee99e.js.map