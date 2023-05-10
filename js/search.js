function ajaxRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url + data, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(JSON.stringify(data));
}

var search_btn = document.querySelector("#search_btn");
var search_input = document.querySelector("#search_input");
var searchResults = document.querySelector("#searchResults");
var Discover = document.querySelector("#Discover");
var musiclist = document.querySelector(".musiclist");
// 歌曲数据存放
var musiclist = [];
/* 请求api */
var api = "http://www.zhangxiaoyue.cn:3000";
search_btn.addEventListener("click", function () {
  var search_input = document.querySelector("#search_input");
  if (search_input.value == "") {
    alert("请输入歌曲或歌手");
    return;
  }
  musiclist.innerHTML = "";
  Raspan.style.display = "none";
  discoverpage.style.display = "none";
  radiopage.style.display = "none";
  searchResults.style.display = "block";
  Lyricspage.style.display = "none";
  recommendpage.style.display = "none";

  console.log(search_input.value);
  var result = new XMLHttpRequest();
  result.open("GET", `${api}/cloudsearch?keywords=` + search_input.value, true);
  result.send();
  result.onreadystatechange = function () {
    if (result.readyState === 4 && result.status === 200) {
      var data = JSON.parse(result.responseText);
      musiclist = data.result.songs;
      renderResults(data.result.songs);
    }
  };
});

function renderResults(searchsong) {
  //渲染
  searchResults.innerHTML = "";

  const fragment = document.createDocumentFragment();
  results = Array.from(searchsong);
  // <i class="bi bi-film"></i>
  for (let j = 0; j < results.length; j++) {
    const div = document.createElement("div");
    div.classList.add("resultitem");
    const td0 = document.createElement("td");
    const mv = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td0.innerHTML = searchsong[j].name;
    mv.innerText = "MV";
    td1.innerHTML = searchsong[j].ar[0].name;
    td2.innerHTML = searchsong[j].al.name;

    td0.style.width = "470px";
    mv.style.borderRadius = "50px";
    mv.style.border = "1px solid #36e2ec";
    td1.style.width = "15%";
    td1.style.marginRight = "12px";
    td1.style.width = "18%";
    td1.style.marginRight = "12px";
    fragment.appendChild(div);
    div.appendChild(td0);
    div.appendChild(mv);
    div.appendChild(td1);
    div.appendChild(td2);

    //提升渲染效率
    // var resultitem = document.querySelectorAll('.resultitem')
    // resultitem[j].addEventListener('click',function (){
    //     console.log(111)
    // })
    console.log(resultitem);
    div.id = searchsong[j].id;
    div.leg = j;
    mv.mvname = searchsong[j].name;
    mv.onclick = function () {
      event.stopPropagation();
      ajaxRequest(
        "GET",
        `${api}/search?keywords=`,
        `${searchsong[j].name}&type=1004`,
        function (data) {
          console.log(data.result.mvs[0].id);
          ajaxRequest(
            "GET",
            `${api}/mv/url?id=`,
            `${data.result.mvs[0].id}`,
            function (data) {
              var video = document.querySelector("#mv");
              video.src = data.data.url;
            }
          );
          ajaxRequest(
            "GET",
            `${api}/comment/mv?id=`,
            `${data.result.mvs[0].id}`,
            function (data) {
              console.log(data);
              // console.log(data.hotComments)
              // data.hotComments.content
              // content评论
              // pendantData.imageUrl头像
              // user.nickname名字
              // data.hotComments[i].pendantData
              //     ? data.hotComments[i].pendantData.imageUrl
              //     : "用户"
              for (var i = 0; i <data.hotComments.length; i++) {
                // renderComments(data.hotComments[i].user.nickname,
                //   data.hotComments[i].timeStr,
                //   data.hotComments[i].pendantData.imageUrl,
                //   data.hotComments[i].content);


                // console.log(data.hotComments[i].user.nickname);
                // console.log(data.hotComments[i].timeStr); //日期
                // console.log(data.hotComments[i].pendantData.imageUrl); //日期
                // console.log(data.hotComments[i].content); //日期
              }
              Raspan.style.display = "block";
              discoverpage.style.display = "none";
              radiopage.style.display = "block";
              searchResults.style.display = "none";
            }
          );
          // ajaxRequest(
          //   "GET",
          //   `${api}/simi/mv?mvid=`,
          //   `${data.result.mvs[0].id}`,
          //   function (data) {
          //     console.log("相似Mv", data.mvs[0].cover); //图片  .id mvid
          //   }
          // );
        }
      );
    };
    div.addEventListener('click',function () {
      mo = this.leg;
      historylist = localStorage.getItem("historylist"); //取出缓存
      historylist = JSON.parse(historylist);
      localStorage.setItem("historylist", JSON.stringify([musiclist[j]]));
      console.log("之前", historylist);
      for (var index = 0; index < historylist.length; index++) {
        if (historylist[index].id == musiclist[j].id) {
          console.log("xiangt");
          historylist.splice(index, 1);
          break;
        }
      }
      historylist.unshift(musiclist[j]);

      historylist = JSON.stringify(historylist);
      localStorage.setItem("historylist", historylist);
      var musicname = document.querySelector("#play_h5");
      musicname.innerText = musiclist[j].name;

      var musicimg = document.querySelector("#play_img");
      musicimg.src = musiclist[j].al.picUrl;

      ajaxRequest(
        "GET",
        `${api}/song/url?id=`,
        musiclist[j].id,
        function (data) {
          var audio = document.querySelector("audio");
          audio.src = data.data[0].url;
          audio.play();
          masterPlay.classList.remove("bi-play-fill");
          masterPlay.classList.add("bi-pause-fill");
          wave.classList.add("active2");
          history();
        }
      );

      ajaxRequest("GET", `${api}/lyric?id=`, musiclist[j].id, function (data) {
        var lrc = data.lrc.lyric;
        lrc = lrc.toString();
        musiclrc(lrc);
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
      });
    })
  }
  searchResults.appendChild(fragment);
}
var resultitem = document.querySelectorAll(".resultitem");
