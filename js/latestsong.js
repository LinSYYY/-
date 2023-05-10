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
            lrc();
          }
        };
      };
    }
  }
};
