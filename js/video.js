window.addEventListener("load", function () {});
var videoplay = document.querySelectorAll(".videoplay");
var video = document.querySelector("video");
videoplay[0].addEventListener("click", function () {
  video.play();
  videoplay[0].style.display = "none";
  videoplay[1].style.display = "block";
});
videoplay[1].addEventListener("click", function () {
  video.pause();
  videoplay[1].style.display = "none";
  videoplay[0].style.display = "block";
});
videoplay[2].addEventListener("click", function () {
  video.requestFullscreen();
});
function comments(id){
  ajaxRequest(
    "GET",
    `${api}/song/url?id=`,
    id,
    function (data) {
    console.log('test',data);
    }
  );
}
var contentBox = document.querySelector(".contentBox");

// function lll(a,b,c,d){
//   const contentBoxs = contentBox.cloneNode(true);
//   // 查找需要复制的现有元素
//   contentBoxs.childNodes[1].style.backgroundImage =`url(${a.user.avatarUrl})`
//   contentBoxs.childNodes[5].innerHTML =c+'1'
//   contentBoxs.childNodes[3].childNodes[3].innerHTML = b+'3'
//   // contentBoxs.childNodes[3].childNodes[1].innerHTML = +'3'
//   contentBoxs.childNodes[3].childNodes[1].innerHTML = d+'4'
//     // 获取现有元素作为插入位置
//     const contentBoxss = document.querySelector(".contentBox");
//     // 添加新元素节点到现有元素之后
//     contentBoxss.appendChild(contentBoxs);
// }

var cm_content = document.getElementsByClassName("cm_content")[0];

// function renderComments(){
//   var contentBox = document.createElement('div');
//   contentBox.classList.add("contentBox");
//   cm_content.appendChild(contentBox);
//   var head = document.createElement('div');
//   head.classList.add(head);
//   head.style.backgroundImage =`url(${data.hotComments[i].pendantData.imageUrl})`;
//   contentBox.appendChild(head);

//   var cntwrap = document.createElement('div');
//   cntwrap.classList.add(cntwrap);
//   var cnt_username = document.createElement('p');
//   cnt_username.classList.add(cnt_username);
//   cnt_username.innerHTML = data.hotComments[i].user.nickname;
//   var p = document.createElement('p');
//   p.innerHTML = data.hotComments[i].content;
//   contentBox.appendChild(cntwrap);
//   cntwrap.appendChild(cnt_username);
//   cntwrap.appendChild(p);

//   var rp = document.createElement('div');
//   contentBox.appendChild(rp);
//   rp.classList.add('rp');
//   rp.innerHTML = data.hotComments[i].timeStr;
// }