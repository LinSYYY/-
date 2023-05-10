if (localStorage.getItem("cookie")) {
  // 用户信息
  ajaxRequest(
    "GET",
    `${api}/user/account?cookie=`,
    localStorage.getItem("cookie"),
    function (data) {
      var introduction = document.querySelector("#introduction");
      introduction.innerHTML = "个人简介:" + data.profile.signature;
      const createTime = new Date(data.account.createTime);
      console.log("用户id", data.account.id);
      localStorage.setItem("userid", data.account.id);
      console.log("注册", createTime.toLocaleString());
      const birthday = new Date(data.profile.birthday);
      var born = document.querySelector("#born");
      born.innerHTML = "生日:" + birthday.toLocaleString();
      var userimg = document.querySelector("#userimg");
      userimg.src = data.profile.avatarUrl;
      const lastLoginTime = new Date(data.profile.lastLoginTime);
      var formerly = document.querySelector("#formerly");
      formerly.innerHTML = "上次登录:" + lastLoginTime.toLocaleString();
      console.log(data.profile.nickname); //名字
      var username = document.querySelector("#username");
      username.innerHTML = data.profile.nickname;
      console.log(username);
      console.log(data.profile.avatarUrl); //头像
      var city = document.querySelector("#city");
      for (let prop in area) {
        if (prop == data.profile.city) {
          city.innerHTML = "城市:" + area[prop];
          back;
        }
      }
    }
  );
  //
  ajaxRequest(
    "GET",
    `${api}/user/playlist?uid=`,
    localStorage.getItem("userid"),
    function (data) {
      for (var i = 0; i < data.playlist.length; i++) {
        cloneElement(
          data.playlist[i].coverImgUrl,
          data.playlist[i].name,
          data.playlist[i].id
        );
      }
      // 渲染完把默认节点给删除
      var mysonglist = document.querySelector(".mysonglist");
      // 删除目标元素的第一个子元素
      const targetItem = mysonglist.children[0];
      // 移除目标子元素
      mysonglist.removeChild(targetItem);
      console.log(data.playlist[6].description); //歌单简介
    }
  );
  var esc = document.querySelector(".m-list");
  // 退出登录
  esc.addEventListener("click", function () {
    localStorage.removeItem("cookie");
    localStorage.removeItem("avatarUrl");
    location.reload();
  });
}
// 该函数用于复制 歌单，必传歌单封面和名字
function cloneElement(url, text, listid) {
  // 查找需要复制的现有元素
  const existingElement = document.querySelector(".listItem");
  // 复制现有元素节点
  const clonedElement = existingElement.cloneNode(true);
  clonedElement.childNodes[1].style.backgroundImage = `url(${url})`;
  clonedElement.childNodes[1].addEventListener("click", function () {
    ajaxRequest(
      "GET",
      `${api}/playlist/track/all?id=`,
      listid,
      function (data) {
        musiclist = data.songs;
      }
    );
    getlrc(listid);
  });
  clonedElement.childNodes[3].innerHTML = text;
  // 获取现有元素作为插入位置
  const targetElement = document.querySelector(".mysonglist");
  // 添加新元素节点到现有元素之后
  targetElement.appendChild(clonedElement);
}
var bi = document.querySelector(".bi-heart");
console.log(bi);
bi.addEventListener("click", function () {
  //喜欢歌曲
  ajaxRequest(
    "GET",
    `${api}/like?id=${musiclist[mo].id}&cookie=`,
    localStorage.getItem("cookie"),
    function (data) {
      console.log(data);
      if (data.code == 200) {
        alert("该歌曲已添加到喜欢的歌单当中");
      } else {
        alert("添加失败");
      }
    }
  );
});
