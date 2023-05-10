// 页面切换
var Discover = document.getElementById("nav_discover");
var Recommended = document.getElementById("nav_recommended");
var Radio = document.getElementById("nav_radio");
var Songlists = document.getElementById("Songlists");

var Dspan = document
  .getElementById("nav_discover")
  .getElementsByTagName("span")[0];
var Rspan = document
  .getElementById("nav_recommended")
  .getElementsByTagName("span")[0];
var Raspan = document
  .getElementById("nav_radio")
  .getElementsByTagName("span")[0];

var discoverpage = document.getElementById("Discover");
var recommendpage = document.getElementById("Recommended");
var radiopage = document.getElementById("Radio");
var songlistspage = document.getElementById("Songlists");

Discover.onclick = function () {
  discoverpage.style.display = "block";
  Discover.style.color = "#fff";
  Dspan.style.display = "block";

  recommendpage.style.display = "none";
  Recommended.style.color = "#4c5262";
  Rspan.style.display = "none";

  radiopage.style.display = "none";
  Radio.style.color = "#4c5262";
  Raspan.style.display = "none";

  songlistspage.style.display = "none";

  searchResults.style.display = "none";
};
Recommended.onclick = function () {
  recommendpage.style.display = "block";
  Recommended.style.color = "#fff";
  Rspan.style.display = "block";

  discoverpage.style.display = "none";
  Discover.style.color = "#4c5262";
  Dspan.style.display = "none";

  radiopage.style.display = "none";
  Radio.style.color = "#4c5262";
  Raspan.style.display = "none";

  songlistspage.style.display = "none";

  searchResults.style.display = "none";
};
Radio.onclick = function () {
  radiopage.style.display = "block";
  Radio.style.color = "#fff";
  Raspan.style.display = "block";

  recommendpage.style.display = "none";
  Recommended.style.color = "#4c5262";
  Rspan.style.display = "none";

  discoverpage.style.display = "none";
  Discover.style.color = "#4c5262";
  Dspan.style.display = "none";

  songlistspage.style.display = "none";

  searchResults.style.display = "none";
};

// 播放
var audio = document.getElementsByTagName("audio")[0];
let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];
var play_img = document.getElementById("play_img");
var play_h5 = document.getElementById("play_h5");

let index = 0;
var arr1 = []; //放点击的歌单的全部歌曲url
var arr = []; //放全部歌单详情
var arr2 = [];

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

masterPlay.addEventListener("click", function () {
  //点击播放按钮
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");

    recordImg.style.animationPlayState = "running";
  } else {
    audio.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
    recordImg.style.animationPlayState = "paused";
  }
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.classList.add("bi-play-circle-fill");
      element.classList.remove("bi-pause-circle-fill");
    }
  );
};

function clickplay(playlist_point) {
  //点击播放列表指定按钮
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove("bi-play-circle-fill");
        e.target.classList.add("bi-pause-circle-fill");
        audio.src = arr1[index - 1];
        play_img.src = playlist_point[index - 1].al.picUrl;
        play_h5.innerHTML = playlist_point[index - 1].name;
        audio.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add("active2");
        audio.addEventListener("ended", () => {
          masterPlay.classList.add("bi-play-fill");
          masterPlay.classList.remove("bi-pause-fill");
          wave.classList.remove("active2");
        });
      });
    }
  );
}
/* 请求api */
var api = "http://www.zhangxiaoyue.cn:3000";
/* 存放歌词 */
var lrcObjs;
// 存放播放时间
var ooo = [];
/* 判断当前已经播放到那一句歌词的数据 */
var ico = 0;
// 唱片旋转
var Lyrics = document.getElementById("Lyrics");
var recordImg = document.getElementById("record-img");
var needle = document.getElementById("needle");

play_img.addEventListener("click", function () {
  Lyrics.style.display = "flex";
  discoverpage.style.display = "none";
  recommendpage.style.display = "none";
  radiopage.style.display = "none";
  songlistspage.style.display = "none";
  recordImg.src = play_img.src;
  if (audio.played) {
    recordImg.style.animationPlayState = "running"; // 开始旋转动画
  }
});
// 唱片旋转

// 最新歌曲
var Latestsong = new XMLHttpRequest();
Latestsong.open("GET", `${api}/personalized/newsong?limit=15`, true);
Latestsong.send();
Latestsong.onreadystatechange = function () {
  if (Latestsong.readyState === 4 && Latestsong.status === 200) {
    var data = JSON.parse(Latestsong.responseText);
    // console.log(data);
    var newsongs = data.result;
    var arr = [];
    var img_play = document.getElementsByClassName("img_play");
    var songItem = document.getElementsByClassName("songItem");
    var img_play_title = document.getElementsByClassName("img_play_title");

    for (let i = 0; i < newsongs.length; i++) {
      arr.push(newsongs[i].id); //把id放一个数组
      var img = document.createElement("img");
      img_play_title[i].innerText = newsongs[i].name;
      img_play[i].appendChild(img);
      img.src = newsongs[i].picUrl;
    }
    var Url = arr;
    for (let i = 0; i < newsongs.length; i++) {
      img_play[i].onclick = function () {
        var play_img = document.getElementById("play_img");
        var play_h5 = document.getElementById("play_h5");
        play_img.src = newsongs[i].picUrl;
        play_h5.innerText = newsongs[i].name;
        var songurl = new XMLHttpRequest();
        songurl.open("GET", `${api}/song/url?id=` + Url[i], true);
        songurl.send();
        songurl.onreadystatechange = function () {
          if (songurl.readyState === 4 && songurl.status === 200) {
            var data = JSON.parse(songurl.responseText);
            // console.log(data);
            var musicurl = data.data[0].url;
            audio.src = musicurl;

            getlrc(Url[i]);
            audio.addEventListener("timeupdate", () => {
              let audio_curr = audio.currentTime;
              let audio_dur = audio.duration;
              for (var key in lrcObjs) {
                if (audio_curr <= ooo[ico + 1] && audio_curr >= ooo[ico]) {
                  ico = ico + 1;
                  var lilrc = document
                    .querySelector("#ullrc")
                    .querySelectorAll("li");
                  for (var io = 0; io < lilrc.length; io++) {
                    lilrc[io].style.color = "#AAAAAA";
                  }
                  timer = 320 - 35 * ico;
                  ullrc.style.marginTop = timer + "px";
                  if (lilrc[ico - 1]) {
                    lilrc[ico - 1].style.color = "pink";
                  } else {
                    lilrc[0].style.color = "pink";
                  }

                  return;
                } else if (
                  audio_curr >= ooo[ico] &&
                  audio_curr >= ooo[ico + 1]
                ) {
                  ico = ico + 1;
                  return;
                } else if (
                  audio_curr <= ooo[ico] &&
                  audio_curr <= ooo[ico + 1]
                ) {
                  ico = ico - 1;
                  return;
                }
              }
              let min = Math.floor(audio_dur / 60);
              let sec = Math.floor(audio_dur % 60);

              if (sec < 10) {
                sec = `0:${sec}`;
              }
              currentEnd.innerText = `${min}:${sec}`;

              let min1 = Math.floor(audio_curr / 60);
              let sec1 = Math.floor(audio_curr % 60);
              if (sec1 < 10) {
                sec = `0:${sec1}`;
              }
              currentStart.innerText = `${min1}:${sec1}`;
            });
          }
        };
      };
    }
  }
};
// 最新歌曲

function getUrl(id) {
  //传入歌曲id获取歌曲url
  var songsUrl = new XMLHttpRequest();
  songsUrl.open("GET", `${api}/song/url?id=` + id, true);
  songsUrl.send();
  songsUrl.onreadystatechange = function () {
    if (songsUrl.readyState === 4 && songsUrl.status === 200) {
      var data = JSON.parse(songsUrl.responseText);
      console.log(data);
      console.log(data.data[0].url);
      arr1.push(data.data[0].url);
    }
  };
}

function getlrc(id) {
  //传入id获取该歌曲的逐句歌词
  var getlrc = new XMLHttpRequest();
  getlrc.open("GET", `${api}/lyric?id=` + id, true);
  getlrc.send();
  getlrc.onreadystatechange = function () {
    if (getlrc.readyState === 4 && getlrc.status === 200) {
      var data = JSON.parse(getlrc.responseText);
      console.log(data);
      var lrc = data.lrc.lyric;
      lrc = lrc.toString();
      console.log(lrc);
      // getLrcArray('调用函数',lrc);
      // console.log('adawsd');
      musiclrc(lrc);
    }
  };
}
// 歌词处理函数

var ullrc = document.getElementById("ullrc");
// console.log(ullrc)
var timer = 300;
ullrc.style.marginTop = timer + "px";
// 歌词函数
function musiclrc(values) {
  li = document.getElementById("ullrc").querySelectorAll("li");
  /*  console.log(li); */
  ullrc.innerHTML = "";
  if (!values) return;
  this.lrc = values;
  var lyrics = values.split("\n");
  var lrcObj = {};
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    var clause = lyric.replace(timeReg, "");
    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      var t = timeRegExpArr[k];
      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/:\d*/i)).slice(1));
      var time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }
  lrcObjs = lrcObj;
  ico = 0;
  for (var key in lrcObj) {
    ooo.push(key * 1);
    var li = document.createElement("li");
    li.innerHTML = lrcObj[key];
    ullrc.appendChild(li);
  }
}

// 推荐歌单部分
var recommend = new XMLHttpRequest();
recommend.open("GET", `${api}/personalized?limit=18`, true); //获取推荐歌单
recommend.send();
recommend.onreadystatechange = function () {
  if (recommend.readyState === 4 && recommend.status === 200) {
    var data = JSON.parse(recommend.responseText);
    // console.log(data);
    var playlists = data.result;
    var topplaylists = document.getElementsByClassName("topplaylists"); //获取整个小盒子
    var playlistsplay = document.getElementsByClassName("playlists_play"); //获取图片部分

    for (let i = 0; i < playlists.length; i++) {
      var p = document.createElement("p"); //加入歌单名
      let img = document.createElement("img"); //加入歌单图片
      playlistsplay[i].appendChild(img); //加入歌单图片
      img.src = playlists[i].picUrl; //渲染图片
      topplaylists[i].appendChild(p); //加入歌单名
      p.innerText = playlists[i].name; //渲染歌单名
      let id = playlists[i].id; //传入所有歌单id
      getdetail(id); //  获取全部歌单详情
      // console.log(arr);

      var playbutton = document.getElementsByClassName("playListPlay"); //获取播放bi图标
      var top_img = document.getElementsByClassName("top_img")[0]; //获取歌单详情大图片
      var top_title = document.getElementsByClassName("top_title")[0]; //歌单名
      var description = document.getElementsByClassName("description")[0]; //简介
      var creatorImg = document.getElementsByClassName("creatorImg")[0]; //创建者头像
      var creatorName = document.getElementsByClassName("creatorName")[0]; //创建者名
      var tags = document.getElementsByClassName("tags")[0]; //标签

      topplaylists[i].onclick = function () {
        //跳转到点击的歌单的详playlistItem情页面
        var playlist_point = arr[i].tracks; //点击的歌单的歌曲详情                playlist_point
        // var songiteminfo = playlist_point[i].al;
        console.log(playlist_point);
        // console.log(songiteminfo);
        Songlists.style.display = "block"; //页面切换
        recommendpage.style.display = "none";
        //歌单详情页面上部分
        top_img.src = playlists[i].picUrl; //渲染歌单图片、歌单名、简介
        top_title.innerText = playlists[i].name;
        description.innerText = arr[i].description;
        creatorName.innerText = arr[i].creator.nickname;
        creatorImg.src = arr[i].creator.avatarUrl;
        //歌单详情页面歌曲部分
        renderSonglist(playlist_point); //渲染歌单详情
        Play(playlist_point); //点击播放全部按钮的效果
        clickplay(playlist_point); //在播放列表点击播放的效果
      };
    }
  }
};
// 推荐歌单部分

function getdetail(id) {
  //  传入id获取歌单详情
  let songsdetail = new XMLHttpRequest();
  songsdetail.open("GET", `${api}/playlist/detail?id=` + id, true);
  songsdetail.send();
  songsdetail.onreadystatechange = function () {
    if (songsdetail.readyState === 4 && songsdetail.status === 200) {
      var data = JSON.parse(songsdetail.responseText);
      var result = arr.push(data.playlist); //所有歌单详情
      for (let m = 0; m < 20; m++) {
        var result2 = arr2.push(data.playlist.tracks[m].al.picUrl);
      }
    }
  };
}

var singlelist = document.getElementsByClassName("singlelist")[0];
function renderSonglist(playlist_point) {
  //渲染页面

  singlelist.innerHTML = ""; //置空

  const fragment = document.createDocumentFragment();
  results = Array.from(playlist_point); //将类数组对象转换成真正的数组
  console.log(results);

  results.forEach(function (playlist_point) {
    const div = document.createElement("div");
    div.classList.add("singlesong");
    const td0 = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td0.innerHTML = playlist_point.name;
    td1.innerHTML = playlist_point.ar[0].name;
    td2.innerHTML = playlist_point.al.name;

    td0.style.width = "450px";
    td0.style.marginLeft = "10px";
    td1.style.width = "15%";
    td1.style.marginRight = "10px";
    td1.style.width = "18%";
    td1.style.marginRight = "12px";

    fragment.appendChild(div);
    div.appendChild(td0);
    div.appendChild(td1);
    div.appendChild(td2);
    //提升渲染效率
  });
  singlelist.appendChild(fragment);
}

function Play(playlist_point) {
  //点击播放全部播放第一首歌曲，并将其余歌曲渲染到播放列表中，其余歌曲url保存在播放列表中
  var Playall = document.getElementsByClassName("Playall")[0]; //获取播放全部元素
  Playall.addEventListener("click", function () {
    arr1 = [];
    Array.from(document.getElementsByClassName("songItem")).forEach(
      (element, i) => {
        //渲染播放列表
        element.getElementsByTagName("img")[0].src =
          playlist_point[i].al.picUrl; //渲染图片
        element.getElementsByTagName("h5")[0].innerHTML =
          playlist_point[i].name; //渲染标题
        let id = playlist_point[i].id;
        getUrl(id);

        play_img.src = playlist_point[0].al.picUrl;
        console.log(arr1);
      }
    );
    audio.src = arr1[0];
    console.log(audio.src);
    audio.play(); //播放第一首歌曲
    masterPlay.classList.remove("bi-play-fill"); //改变控件图形
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
    console.log(22);
  });
}

audio.addEventListener("timeupdate", () => {
  let audio_curr = audio.currentTime;
  let audio_dur = audio.duration;

  let min = Math.floor(audio_dur / 60);
  let sec = Math.floor(audio_dur % 60);
  if (sec < 10) {
    sec = `0:${sec}`;
  }
  currentEnd.innerText = `${min}:${sec}`;

  let min1 = Math.floor(audio_curr / 60);
  let sec1 = Math.floor(audio_curr % 60);
  if (sec1 < 10) {
    sec = `0:${sec1}`;
  }
  currentStart.innerText = `${min1}:${sec1}`;

  let progressbar = parseInt((audio.currentTime / audio.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  audio.currentTime = (seek.value * audio.duration) / 100;
});

audio.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill");
  masterPlay.classList.remove("bi-pause-fill");
  wave.classList.remove("active2");
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol_dot");
let vol_bar = document.getElementsByClassName("vol_bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.add("bi-volume-up-fill");
  }

  let vol_a = vol.value;
  vol_var.style.width = `${vol_a}%`;
  vol_var.style.left = `${vol_a}%`;
  audio.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = array.from(document.getElementsByClassName("songItem")).length;
  }
});

function searchs() {
  searchResults.style.display = "block";
  discoverpage.style.display = "none";
  recommendpage.style.display = "none";
  songlistspage.style.display = "none";
}
// 页面切换

// 登陆
var login = document.getElementById("login");
var loginBox = document.getElementsByClassName("login");
login.onclick = function () {
  //登陆
  loginBox[0].style.display = "block"; //显示登陆框
  producecode(); //生成二维码，检查二维码状态
};
var cancel = document.getElementsByClassName("bi-x-lg");
cancel[0].onclick = function () {
  loginBox[0].style.display = "none";
};

function producecode() {
  var QRcode = new XMLHttpRequest(); //生成unikey
  QRcode.open("GET", `${api}/login/qr/key?t=` + Date.now(), true);
  QRcode.send();
  QRcode.onreadystatechange = function () {
    if (QRcode.readyState === 4 && QRcode.status === 200) {
      var data = JSON.parse(QRcode.responseText);
      console.log(data);
      let unikey = data.data.unikey;
      code(unikey);
      checkQRCodeStatus(unikey);
    }
  };
}

var codeshow = document.getElementsByClassName("code")[0];
function code(unikey) {
  //生成二维码
  var code = new XMLHttpRequest();
  code.open(
    "GET",
    `${api}/login/qr/create?key=` +
      unikey +
      "&qrimg=" +
      unikey +
      "&t=" +
      Date.now(),
    true
  );
  code.send();
  code.onreadystatechange = function () {
    if (code.readyState === 4 && code.status === 200) {
      var data = JSON.parse(code.responseText);
      console.log(data);
      var img = document.createElement("img");
      img.classList.add("codeimg");
      // console.log(data.data.qrimg);
      img.src = data.data.qrimg;
      codeshow.appendChild(img);
    }
  };
}

function checkQRCodeStatus(unikey) {
  // 检查二维码状态
  var QRcodestatus = new XMLHttpRequest();
  QRcodestatus.open(
    "GET",
    `${api}/login/qr/check?key=` + unikey + "&t=" + Date.now(),
    true
  );
  QRcodestatus.send();
  QRcodestatus.onreadystatechange = function () {
    if (QRcodestatus.readyState === 4 && QRcodestatus.status === 200) {
      var data = JSON.parse(QRcodestatus.responseText);
      console.log(data.code);
      if (data.code == "800") {
        var img = document.getElementsByClassName("codeimg")[0];
        codeshow.removeChild(img);
        producecode();
        code(unikey);
        checkQRCodeStatus(unikey);
      } else if (data.code == "803") {
        console.log(data);
        console.log(data.code);
        var login = document.getElementsByClassName("login")[0];
        login.style.display = "none";
        localStorage.setItem("cookies", data.cookies); //登陆持久化,本地存储cookies
        // checkLogin(); //检查登陆状态
      } else {
        //二维码未扫描，继续检查
        setTimeout(function () {
          checkQRCodeStatus(unikey);
        }, 1000);
      }
    }
  };
}

var check = new XMLHttpRequest();
check.open("GET", `${api}/login/status`, true); //检查登陆状态
check.send();
check.onreadystatechange = function () {
  if (check.readyState === 4 && check.status === 200) {
    var data = JSON.parse(check.responseText);
    // console.log(data);
    var userinfo = data.data.account;
    var cookies = localStorage.getItem("cookies");
    if (cookies) {
      // 已经登录，可以进行后续操作
      var user = document.getElementsByClassName("user")[0];
      var h5 = document.getElementById("login");
      user.removeChild(h5);
      var img = document.createElement("img");
      user.appendChild(img);
      img.setAttribute("src", "./img/user.jpg");
      var username = document.createElement("h6");
      user.appendChild(username);
      username.innerText = userinfo.userName;
    }
  }
};

// 登陆

// 搜索
const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_btn");
const searchResults = document.getElementById("searchResults");
const historyList = document.getElementById("history_list");
const searchBox = document.getElementsByClassName("search")[0]; //弹出框
const searchHot = document.getElementById("search_hot");

var ifvisible = false; //避免多次点击重复添加
searchInput.addEventListener("click", () => {
  //点击搜索框弹出热搜列表
  searchHot.style.display = "block";
  var Hot = new XMLHttpRequest();
  Hot.open("GET", `${api}/search/hot`, true);
  Hot.send();
  Hot.onreadystatechange = function () {
    if (Hot.readyState === 4 && Hot.status === 200) {
      var data = JSON.parse(Hot.responseText);
      console.log(data);
      var hotsong = data.result.hots;
      var fragment = document.createDocumentFragment();
      if (!ifvisible) {
        for (var i = 0; i < hotsong.length; i++) {
          var li = document.createElement("li");
          li.innerHTML = hotsong[i].first;
          fragment.appendChild(li);
        }
        searchHot.appendChild(fragment);
      }
      ifvisible = true;
    }
  };
  document.addEventListener("click", function (event) {
    if (!searchBox.contains(event.target)) {
      // 如果点击的区域不在弹窗内，则关闭弹窗
      searchHot.style.display = "none";
    }
  });
});

searchBtn.addEventListener("click", search); //监听搜索按钮的点击事件
searchBtn.addEventListener("click", searchhistory);
searchInput.addEventListener("keydown", function (event) {
  //监听输入框的回车事件
  if (event.code === "Enter") {
    //按回车键搜索
    search();
    searchhistory();
  }
});

function search() {
  //搜索
  var keyword = searchInput.value;
  var search = new XMLHttpRequest();
  search.open("GET", `${api}/cloudsearch?keywords=` + keyword, true);
  search.send();
  search.onreadystatechange = function () {
    if (search.readyState === 4 && search.status === 200) {
      var result = JSON.parse(search.responseText);
      var searchsong = result.result.songs;
      searchs();
      renderResults(searchsong); //渲染页面
    }
  };
}

function renderResults(searchsong) {
  //渲染
  discoverpage.style.display = "none";
  searchResults.innerHTML = "";

  if (searchsong.length === 0) {
    searchResults.innerHTML = "没有搜索到相关内容";
    return;
  }

  const fragment = document.createDocumentFragment();
  results = Array.from(searchsong); //将类数组对象转换成真正的数组

  results.forEach(function (searchsong) {
    const div = document.createElement("div");
    div.classList.add("resultitem");
    const td0 = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td0.innerHTML = searchsong.name;
    td1.innerHTML = searchsong.ar[0].name;
    td2.innerHTML = searchsong.al.name;

    td0.style.width = "500px";
    td1.style.width = "15%";
    td1.style.marginRight = "12px";
    td1.style.width = "18%";
    td1.style.marginRight = "12px";

    fragment.appendChild(div);
    div.appendChild(td0);
    div.appendChild(td1);
    div.appendChild(td2);
    //提升渲染效率
  });
  searchResults.appendChild(fragment);
}

function searchhistory() {
  //历史搜索记录
  var keyword = searchInput.value.trim();
  if (keyword) {
    // 将关键字添加到搜索历史记录中
    var li = document.createElement("li");
    li.innerText = keyword;
    var parentElement = document.getElementById("searchHistoryList");
    parentElement.insertBefore(li, parentElement.firstChild);
    // 清空搜索框中的内容
    searchBox.value = "";
  }
}

//监听搜索历史记录的点击事件
searchHot.addEventListener("click", function (event) {
  // 如果点击的是搜索历史记录中的某个关键字，则将该关键字填充到搜索框中
  if (event.target.tagName === "LI") {
    searchInput.value = event.target.innerText;
    search();
  }
});
// 搜索

// 轮播图
var banner = new XMLHttpRequest();
banner.open("GET", `${api}/banner`, true);
banner.send();
banner.onreadystatechange = function () {
  if (banner.readyState === 4 && banner.status === 200) {
    var data = JSON.parse(banner.responseText);
    var bannerlist = data.banners;
    // console.log(data);
    // console.log(bannerlist);
    var images = [];
    for (var i = 0; i < bannerlist.length; i++) {
      var imageurl = bannerlist[i].imageUrl;
      images.push(imageurl);
    }
    // console.log(images);
    var image = document.getElementsByClassName("image")[0];
    var img = document.createElement("img");
    img.setAttribute("id", "img-show");
    img.src = images[0];
    image.appendChild(img);
    let dotContainer = document.getElementById("dot-container");

    for (let i = 0; i < images.length; i++) {
      let dot = document.createElement("span");
      dot.className = "dot";
      dot.id = "dot" + i;

      dot.addEventListener("click", function () {
        clearTimeout(t);
        dotID = this.getAttribute("id");
        imgNow = Number(dotID.replace("dot", ""));
        document.getElementById("img-show").src = images[imgNow];

        for (let i = 0; i < dots.length; i++) {
          dots[i].className = "dot";
        }

        this.className = "dot selected";
        t = setTimeout(() => {
          timer();
        }, 1000 * 2);
      });
      dotContainer.appendChild(dot);
    }

    var imgNow = 0;
    // 图片切换函数，传入布尔值，true:前一张， false:后一张
    function changeImage(direction) {
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = "dot";
      }
      if (direction) {
        if (imgNow == 0) {
          imgNow = images.length - 1;
        } else {
          imgNow -= 1;
        }
        document.getElementById("img-show").src = images[imgNow];
        dots[imgNow].className = "dot selected";
      } else {
        if (imgNow == images.length - 1) {
          imgNow = 0;
        } else {
          imgNow += 1;
        }
        document.getElementById("img-show").src = images[imgNow];
        dots[imgNow].className = "dot selected";
      }
    }

    function timer() {
      changeImage(false);
      t = setTimeout(() => {
        timer();
      }, 1000 * 2);
    }

    let defaultDot = (document.getElementById("dot0").className =
      "dot selected");
    let dots = document.getElementsByClassName("dot");
    t = setTimeout(() => {
      timer();
    }, 1000 * 2);

    let previous = document.getElementById("to-pre");
    previous.addEventListener("click", function () {
      clearTimeout(t);
      changeImage(true);
      t = setTimeout(() => {
        timer();
      }, 1000 * 2);
    });

    let next = document.getElementById("to-next");
    next.addEventListener("click", function () {
      clearTimeout(t);
      changeImage(false);
      t = setTimeout(() => {
        timer();
      }, 1000 * 2);
    });

    document
      .getElementById("img-show")
      .addEventListener("mouseover", function () {
        clearTimeout(t);
      });
    document
      .getElementById("img-show")
      .addEventListener("mouseout", function () {
        t = setTimeout(() => {
          timer();
        }, 1000 * 2);
      });
  }
};
// 轮播图

// 热门歌手和最新歌曲控制键
let left_scroll = document.getElementById("left_scroll");
let right_scroll = document.getElementById("right_scroll");
let pop_song = document.getElementsByClassName("pop_song")[0];

left_scroll.addEventListener("click", () => {
  pop_song.scrollLeft -= 330;
});
right_scroll.addEventListener("click", () => {
  pop_song.scrollLeft += 330;
});

let left_scrolls = document.getElementById("left_scrolls");
let right_scrolls = document.getElementById("right_scrolls");
let item = document.getElementsByClassName("item")[0];

left_scrolls.addEventListener("click", () => {
  item.scrollLeft -= 330;
});
right_scrolls.addEventListener("click", () => {
  item.scrollLeft += 330;
});
// 热门歌手和最新歌曲控制键

// 热门歌手
var popular_artists = new XMLHttpRequest();
popular_artists.open("GET", `${api}/top/artists?limit=15`, true);
popular_artists.send();
popular_artists.onreadystatechange = function () {
  if (popular_artists.readyState === 4 && popular_artists.status === 200) {
    var data = JSON.parse(popular_artists.responseText);
    // console.log(data);
    var singerlist = data.artists;
    var item = document.getElementsByClassName("item")[0];
    for (var i = 0; i < singerlist.length; i++) {
      var li = document.createElement("li");
      var img = document.createElement("img");
      item.appendChild(li);
      li.appendChild(img);
      img.src = singerlist[i].img1v1Url;
      img.title = singerlist[i].name;
    }
  }
};
