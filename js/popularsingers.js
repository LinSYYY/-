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