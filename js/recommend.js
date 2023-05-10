var arr = [];
var arr1 = [];
var arr2 = [];

var musiclistid = [];
var id = 0;
var present = 0;

var Playall = document.getElementsByClassName("Playall")[0]; //获取播放全部元素

//recommend主界面
var topplaylists = document.getElementsByClassName("topplaylists"); //获取整个小盒子
var playlistsplay = document.getElementsByClassName("playlists_play"); //获取图片部分
//recommend主界面

// 具体歌单详情界面
var playbutton = document.getElementsByClassName("playListPlay"); //获取播放bi图标
var top_img = document.getElementsByClassName("top_img")[0]; //获取歌单详情大图片
var top_title = document.getElementsByClassName("top_title")[0]; //歌单名
var description = document.getElementsByClassName("description")[0]; //简介
var creatorImg = document.getElementsByClassName("creatorImg")[0]; //创建者头像
var creatorName = document.getElementsByClassName("creatorName")[0]; //创建者名
var tags = document.getElementsByClassName("tags")[0]; //标签
// 具体歌单详情界面

// 左下角封面、歌名
var play_img = document.getElementById("play_img");
var play_h5 = document.getElementById("play_h5");
// 左下角封面、歌名
var recommend = new XMLHttpRequest();
recommend.open("GET", `${api}/personalized`, true); //获取推荐歌单
recommend.send();
recommend.onreadystatechange = function () {
  if (recommend.readyState === 4 && recommend.status === 200) {
    var data = JSON.parse(recommend.responseText);
    var playlists = data.result;
    // console.log(playlists); //推荐歌单

    for (let i = 0; i < playlists.length; i++) {
      var p = document.createElement("p"); //加入歌单名
      let img = document.createElement("img"); //加入歌单图片
      playlistsplay[i].appendChild(img); //加入歌单图片
      img.src = playlists[i].picUrl; //渲染图片
      topplaylists[i].appendChild(p); //加入歌单名
      p.innerText = playlists[i].name; //渲染歌单名
      musiclistid = playlists[i].id; //传入所有歌单id

      getdetail(musiclistid); //  获取全部歌单详情,arr在这里
      topplaylists[i].onclick = function () {
        //跳转到点击的歌单的详playlistItem情页面
        var musiclist = arr[i].tracks; //点击的歌单的歌曲详情

        // var songiteminfo =  musiclist[i].al;
        console.log("adwdwa", musiclist); //点击的歌单的歌曲详情
        Songlists.style.display = "block"; //页面切换
        recommendpage.style.display = "none";

        //歌单详情页面上部分
        top_img.src = playlists[i].picUrl; //渲染歌单图片、歌单名、简介
        top_title.innerText = playlists[i].name;
        description.innerText = arr[i].description;
        creatorName.innerText = arr[i].creator.nickname;
        creatorImg.src = arr[i].creator.avatarUrl;
        //歌单详情页面歌曲部分

        renderSonglist(musiclist); //渲染歌单详情
        id = playlists[i].id;
        clickplay(musiclist); //在播放列表点击播放的效果
      };
    }
  }
};

function getdetail(id) {
  //  传入id获取歌单详情
  let songsdetail = new XMLHttpRequest();
  songsdetail.open("GET", `${api}/playlist/detail?id=` + id, true);
  songsdetail.send();
  songsdetail.onreadystatechange = function () {
    if (songsdetail.readyState === 4 && songsdetail.status === 200) {
      var data = JSON.parse(songsdetail.responseText);
      var result = arr.push(data.playlist); //所有歌单详情放在arr数组里
      for (let m = 0; m < 20; m++) {
        var result2 = arr2.push(data.playlist.tracks[m].al.picUrl);
      }
    }
  };
}

function getUrl(id) {
  //传入歌曲id获取歌曲url
  var songsUrl = new XMLHttpRequest();
  songsUrl.open("GET", `${api}/song/url?id=` + id, true);
  songsUrl.send();
  songsUrl.onreadystatechange = function () {
    if (songsUrl.readyState === 4 && songsUrl.status === 200) {
      var data = JSON.parse(songsUrl.responseText);
      console.log(data.data[0].url);
      arr1.push(data.data[0].url);
    }
  };
}

// var Switch =  false
Playall.addEventListener("click", function () {
  if (present === id || id==0) {
    return;
  }
  present = id;
  musiclist = playlist;
  mo = -1;
  next.click();
  audio.play(); //播放第一首歌曲
  masterPlay.classList.remove("bi-play-fill"); //改变控件图形
  masterPlay.classList.add("bi-pause-fill");
  wave.classList.add("active2");

  console.log(musiclist);
  Array.from(document.getElementsByClassName("songItem")).forEach(
    (element, i) => {
      //渲染播放列表
      element.getElementsByTagName("img")[0].src = musiclist[i].al.picUrl; //渲染图片
      console.log(musiclist);
      element.getElementsByTagName("h5")[0].innerHTML = musiclist[i].name; //渲染标题
      let id = musiclist[i].id;
      getUrl(id);

      play_img.src = musiclist[0].al.picUrl;
      play_h5.innerHTML = musiclist[0].name;
    }
  );
});

var playlist = [];
var singlelist = document.getElementsByClassName("singlelist")[0];
function renderSonglist(musiclist) {
  //渲染页面

  singlelist.innerHTML = ""; //置空

  const fragment = document.createDocumentFragment();
  results = Array.from(musiclist); //将类数组对象转换成真正的数组
  playlist = results;

  results.forEach(function (musiclist) {
    const div = document.createElement("div");
    div.classList.add("singlesong");
    const td0 = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td0.innerHTML = musiclist.name;
    td1.innerHTML = musiclist.ar[0].name;
    td2.innerHTML = musiclist.al.name;

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

function clickplay(musiclist) {
  //点击播放列表指定按钮
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove("bi-play-circle-fill");
        e.target.classList.add("bi-pause-circle-fill");
        audio.src = arr1[index - 1];
        play_img.src = musiclist[index - 1].al.picUrl;
        play_h5.innerHTML = musiclist[index - 1].name;
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
