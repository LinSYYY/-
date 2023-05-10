// 轮播图
var banner = new XMLHttpRequest();
banner.open("GET", `${api}/banner`, true);
banner.send();
banner.onreadystatechange = function () {
  if (banner.readyState === 4 && banner.status === 200) {
    var data = JSON.parse(banner.responseText);
    var bannerlist = data.banners;
    // console.log(data);
    // console.log(bannerlist);
    var images = [];
    for (var i = 0; i < bannerlist.length; i++) {
      var imageurl = bannerlist[i].imageUrl;
      images.push(imageurl);
    }
    // console.log(images);
    var image = document.getElementsByClassName("image")[0];
    var img = document.createElement("img");
    img.setAttribute("id", "img-show");
    img.src = images[0];
    image.appendChild(img);
    let dotContainer = document.getElementById("dot-container");

    for (let i = 0; i < images.length; i++) {
      let dot = document.createElement("span");
      dot.className = "dot";
      dot.id = "dot" + i;

      dot.addEventListener("click", function () {
        clearTimeout(t);
        dotID = this.getAttribute("id");
        imgNow = Number(dotID.replace("dot", ""));
        document.getElementById("img-show").src = images[imgNow];

        for (let i = 0; i < dots.length; i++) {
          dots[i].className = "dot";
        }

        this.className = "dot selected";
        t = setTimeout(() => {
          timer();
        }, 1000 * 2);
      });
      dotContainer.appendChild(dot);
    }

    var imgNow = 0;
    // 图片切换函数，传入布尔值，true:前一张， false:后一张
    function changeImage(direction) {
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = "dot";
      }
      if (direction) {
        if (imgNow == 0) {
          imgNow = images.length - 1;
        } else {
          imgNow -= 1;
        }
        document.getElementById("img-show").src = images[imgNow];
        dots[imgNow].className = "dot selected";
      } else {
        if (imgNow == images.length - 1) {
          imgNow = 0;
        } else {
          imgNow += 1;
        }
        document.getElementById("img-show").src = images[imgNow];
        dots[imgNow].className = "dot selected";
      }
    }

    function timer() {
      changeImage(false);
      t = setTimeout(() => {
        timer();
      }, 1000 * 2);
    }

    let defaultDot = (document.getElementById("dot0").className =
      "dot selected");
    let dots = document.getElementsByClassName("dot");
    t = setTimeout(() => {
      timer();
    }, 1000 * 2);

    let previous = document.getElementById("to-pre");
    previous.addEventListener("click", function () {
      clearTimeout(t);
      changeImage(true);
      t = setTimeout(() => {
        timer();
      }, 1000 * 2);
    });

    let next = document.getElementById("to-next");
    next.addEventListener("click", function () {
      clearTimeout(t);
      changeImage(false);
      t = setTimeout(() => {
        timer();
      }, 1000 * 2);
    });

    document
      .getElementById("img-show")
      .addEventListener("mouseover", function () {
        clearTimeout(t);
      });
    document
      .getElementById("img-show")
      .addEventListener("mouseout", function () {
        t = setTimeout(() => {
          timer();
        }, 1000 * 2);
      });
  }
};
// 轮播图
