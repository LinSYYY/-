var audio = document.getElementsByTagName("audio")[0];
let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

var musicname = document.getElementById("play_h5");

var recordImg = document.getElementById("record-img");
// 记录当前播放到第几首歌曲
var mo = 0;
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

back.addEventListener("click", function () {
  mo--;
  if (!musiclist[mo]) {
    mo = musiclist.length - 1;
  }
  console.log("第", mo, "首");
  ajaxRequest("GET", `${api}/song/url?id=`, musiclist[mo].id, function (data) {
    audio.src = data.data[0].url;
    audio.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
    musicname.innerText = musiclist[mo].name;
    // console.log('歌手',musiclist[mo]);//此处有多个歌手demo只展示第一位歌手
    var musicimg = document.querySelector("#play_img");
    musicimg.src = musiclist[mo].al.picUrl;
  });
});
// 控制音频静音切换
var playno = true;
var control = document.querySelector("#vol_icon");
control.onclick = function () {
  console.log("adwd");
  if (!playno) {
    audio.muted = true;
    console.log("静音");
  } else {
    console.log("未静音");
    audio.muted = false;
  }
  playno = !playno;
};
// 取消单曲循环

// 单曲循环
var op = false;
audio.loop = op;
// 随机播放
var random = false;
next.addEventListener("click", function () {
  if (op) {
    return;
  } else if (random) {
    mo = Math.floor(Math.random() * musiclist.length) - 1;
  }

  mo++;
  if (!musiclist[mo]) {
    mo = 0;
  }
  console.log("第", mo, "首");
  getlrc(musiclist[mo].id);
  ajaxRequest("GET", `${api}/song/url?id=`, musiclist[mo].id, function (data) {
    musicname.innerText = musiclist[mo].name;
    // console.log('歌手',musiclist[mo]);//此处有多个歌手demo只展示第一位歌手
    var musicimg = document.querySelector("#play_img");
    musicimg.src = musiclist[mo].al.picUrl;
    audio.src = data.data[0].url;
    audio.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
    lrc();
  });
});
// var audio = document.querySelector('audio')
audio.onended = function () {
  next.click();
};

var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");

icon1.style.display = "block";
icon1.onclick = function () {
  random = false;
  console.log("顺训");
  icon1.style.display = "none";
  icon3.style.display = "none";
  icon2.style.display = "block";
};
icon2.onclick = function () {
  op = false;
  audio.loop = op;
  console.log("随机");
  icon2.style.display = "none";
  icon1.style.display = "none";
  icon3.style.display = "block";
};
icon3.onclick = function () {
  console.log("单曲");
  random = true;
  icon3.style.display = "none";
  icon2.style.display = "none";
  icon1.style.display = "block";
};
