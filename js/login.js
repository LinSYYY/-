window.addEventListener("load", function () {
  var login = document.getElementById("login");
  var logo = document.getElementsByClassName("logo")[0];
  var h2 = document.querySelector("h2");
  if (localStorage.getItem("cookie")) {
    avatarUrl = localStorage.getItem("avatarUrl"); //取出缓存
    var user = document.getElementsByClassName("user")[0];
    var img = document.createElement("img");
    user.appendChild(img);
    var username = document.createElement("h6");
    user.appendChild(username);
    avatarUrl = JSON.parse(avatarUrl);
    username.innerText = avatarUrl.name;
    img.setAttribute("src", avatarUrl.userimg);
  }
  login.onclick = function () {
    //登陆
    logo.style.display = "flex"; //显示登陆框
    var key = "";
    var QRcodes = "https://like927.cn/";
    ajaxRequest(
      "GET",
      `${api}/login/qr/key?timestamp=`,
      Date.parse(new Date()),
      function (data) {
        key = data.data.unikey;
        ajaxRequest(
          "GET",
          `${api}/login/qr/create?key=${key}&`,
          `timestamp=${Date.parse(new Date())}`,
          function (data) {
            QRcodes = data.data.qrurl;
            var demo = new QRCode(document.getElementById("qrcode"), {
              text: QRcodes,
              width: 256,
              height: 256,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.H,
            });
          }
        );
      }
    );

    var timers = setInterval(function () {
      ajaxRequest(
        "GET",
        `${api}/login/qr/check?key=${key}&`,
        `timestamp=${Date.parse(new Date())}`,
        function (data) {
          if (data.code == 800) {
            h2.innerText = "二维码过期";
          } else if (data.code == 801) {
            h2.innerText = "等待扫码";
          } else if (data.code == 803) {
            h2.innerText = "登录成功";
            console.log(data);
            localStorage.setItem("cookie", data.cookie);
            clearInterval(timers);
            logo.style.display = "none";
            avatarUrl = localStorage.getItem("avatarUrl"); //取出缓存
            var user = document.getElementsByClassName("user")[0];
            var img = document.createElement("img");
            user.appendChild(img);
            var username = document.createElement("h6");
            user.appendChild(username);
            avatarUrl = JSON.parse(avatarUrl);
            console.log(avatarUrl);
            username.innerText = avatarUrl.name;
            img.setAttribute("src", avatarUrl.userimg);
          } else if (data.code == 802) {
            localStorage.setItem(
              "avatarUrl",
              JSON.stringify({ name: data.nickname, userimg: data.avatarUrl })
            );
            h2.innerText = data.nickname;
          }
        }
      );
    }, 1000);
  };
});
