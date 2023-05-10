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
function lrc() {
  audio.addEventListener("timeupdate", () => {
    let audio_curr = audio.currentTime;
    let audio_dur = audio.duration;
    ooo = [];
    for (var key in lrcObjs) {
      ooo.push(key * 1);
    }
    for (var key in lrcObjs) {
      if (audio_curr <= ooo[ico + 1] && audio_curr >= ooo[ico]) {
        ico = ico + 1;
        var lilrc = document.querySelector("#ullrc").querySelectorAll("li");
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
      } else if (audio_curr >= ooo[ico] && audio_curr >= ooo[ico + 1]) {
        ico = ico + 1;
        return;
      } else if (audio_curr <= ooo[ico] && audio_curr <= ooo[ico + 1]) {
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
