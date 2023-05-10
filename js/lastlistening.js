function history(){
  historylist = localStorage.getItem("historylist"); //取出缓存
historylist = JSON.parse(historylist);
console.log(historylist);

var lstindex = historylist.length;
const ul = document.getElementById("song_lastlistening");
const children = ul.children;
newdata = null;
const newArr = historylist[0];
for (let i = 0; i < children.length; i++) {
  const img = children[i].children[1];
  img.src = historylist[i].al.picUrl;
  const name = children[i].children[2];
  name.innerHTML = historylist[i].name;
}
}
history();