var newlist = document.querySelector("#newlist");
var newlistid = document.querySelector("#newlistid");
newlistid.addEventListener("click", function () {
  newlist.style.display = "flex";
  console.log("dd");
});
var btn = document.querySelector(".btn").querySelectorAll("button");
btn[0].addEventListener("click", function () {
  console.log("退出");
  newlist.style.display = "none";
});
btn[1].addEventListener("click", function () {
  console.log("确定");
  var newdata = document.querySelectorAll(".newdata");
  console.log(newdata);
  console.log(newdata[0].value); //名称
  // 歌单
  ajaxRequest(
    "GET",
    `${api}/playlist/create?name=${newdata[0].value}&cookie=`,
    localStorage.getItem("cookie"),
    function (data) {
      newdata[0].value;
      ajaxRequest(
        "GET",
        `${api}/playlist/desc/update?id=${data.id}&desc=${newdata[1].value}&cookie=`,
        localStorage.getItem("cookie"),
        function (data) {
          if (data.code == 200) {
            newlist();
          }
        }
      );
    }
  );
  newlist.style.display = "none";
});
